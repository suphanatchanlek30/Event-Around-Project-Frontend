'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { FaFileAlt, FaTimes, FaUpload } from 'react-icons/fa';

import {
  ImportEventsResult,
  importEventsCsv,
  importEventsJson,
} from '@/services';

type ImportUploadModalProps = {
  isOpen: boolean;
  mode: 'CSV' | 'JSON';
  onClose: () => void;
  onCompleted: (result: ImportEventsResult, source: 'CSV' | 'JSON') => void;
};

const parseJsonEvents = (rawJson: string) => {
  const parsed = JSON.parse(rawJson);

  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.events)) {
    throw new Error('JSON ต้องอยู่ในรูปแบบ {"events": [...]}');
  }

  return parsed;
};

export const ImportUploadModal = ({ isOpen, mode, onClose, onCompleted }: ImportUploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const [jsonText, setJsonText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setDefaultStatus('DRAFT');
      setJsonText('');
      setErrorMessage('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleJsonFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const rawJson = await file.text();
      parseJsonEvents(rawJson);
      setJsonText(rawJson);
      setSelectedFile(file);
      setErrorMessage('');
    } catch {
      setErrorMessage('ไฟล์ JSON ไม่อยู่ในรูปแบบที่ระบบรองรับ');
    } finally {
      event.target.value = '';
    }
  };

  const handleCsvFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? null);
    setErrorMessage('');
    event.target.value = '';
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage('');

      if (mode === 'CSV') {
        if (!selectedFile) {
          setErrorMessage('กรุณาเลือกไฟล์ CSV');
          return;
        }

        const response = await importEventsCsv({
          file: selectedFile,
          defaultStatus,
        });

        onCompleted(response.data, 'CSV');
        onClose();
        return;
      }

      if (!jsonText.trim()) {
        setErrorMessage('กรุณาวาง JSON หรือเลือกไฟล์ .json');
        return;
      }

      const payload = parseJsonEvents(jsonText.trim());
      const response = await importEventsJson(payload);
      onCompleted(response.data, 'JSON');
      onClose();
    } catch (error) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        (error as { response?: { data?: { message?: string } } }).response?.data?.message
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : mode === 'CSV'
            ? 'อัปโหลด CSV ไม่สำเร็จ'
            : 'นำเข้า JSON ไม่สำเร็จ';

      setErrorMessage(message || 'นำเข้าข้อมูลไม่สำเร็จ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="ปิดหน้าต่าง"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl rounded-[28px] border border-border bg-surface p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="ปิด"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-muted hover:bg-border"
        >
          <FaTimes />
        </button>

        <div className="pr-10">
          <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
            {mode === 'CSV' ? 'CSV Import' : 'JSON Import'}
          </p>
          <h3 className="mt-3 text-2xl font-bold text-foreground">
            {mode === 'CSV' ? 'อัปโหลดไฟล์ CSV สำหรับสร้างหลายกิจกรรม' : 'นำเข้ากิจกรรมด้วย JSON array'}
          </h3>
          <p className="mt-2 text-sm text-muted">
            {mode === 'CSV'
              ? 'เลือกไฟล์ CSV แล้วกำหนดสถานะเริ่มต้นก่อนส่งเข้า API'
              : 'วาง payload รูปแบบ {"events": [...]} หรือเลือกไฟล์ .json เพื่อส่งเข้า API'}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {mode === 'CSV' ? (
            <>
              <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface-muted/40 px-6 py-8 text-center hover:bg-surface-muted">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaUpload />
                </span>
                <span className="mt-4 text-base font-semibold text-foreground">
                  {selectedFile ? selectedFile.name : 'คลิกเพื่อเลือกไฟล์ CSV'}
                </span>
                <span className="mt-2 text-sm text-muted">รองรับไฟล์ .csv และจะส่งเป็น multipart/form-data</span>
                <input type="file" accept=".csv,text/csv" className="hidden" onChange={handleCsvFileChange} />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">Default Status</span>
                <select
                  value={defaultStatus}
                  onChange={(event) => setDefaultStatus(event.target.value as 'DRAFT' | 'PUBLISHED')}
                  className="mt-2 h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                </select>
              </label>
            </>
          ) : (
            <>
              <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface-muted/40 px-6 py-6 text-center hover:bg-surface-muted">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaFileAlt />
                </span>
                <span className="mt-3 text-base font-semibold text-foreground">
                  {selectedFile ? selectedFile.name : 'เลือกไฟล์ .json หรือวาง payload ด้านล่าง'}
                </span>
                <input type="file" accept=".json,application/json" className="hidden" onChange={handleJsonFileChange} />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">JSON Payload</span>
                <textarea
                  value={jsonText}
                  onChange={(event) => {
                    setJsonText(event.target.value);
                    setErrorMessage('');
                  }}
                  rows={10}
                  placeholder='{"events":[{"title":"Python Workshop","description":"..."}]}'
                  className="mt-2 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
                />
              </label>
            </>
          )}

          {errorMessage ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl border border-border px-4 text-sm font-medium text-foreground hover:bg-surface-muted"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-70"
          >
            {isSubmitting ? 'กำลังนำเข้า...' : mode === 'CSV' ? 'อัปโหลด CSV' : 'นำเข้า JSON'}
          </button>
        </div>
      </div>
    </div>
  );
};
