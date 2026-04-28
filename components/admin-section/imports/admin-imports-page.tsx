"use client";

import { useCallback, useEffect, useState } from 'react';

import type {
  ImportErrorItem,
  ImportEventsResult,
  ImportHistoryItem,
  ImportHistoryMeta,
  ImportStatusTone,
} from '@/services';
import { getImportHistory } from '@/services';

import { formatThaiDateTime } from '@/lib/thai-datetime';
import { ImportUploadModal } from '@/components/organizer-section/imports/import-upload-modal';

const STATUS_TONE_CLASS: Record<ImportStatusTone, string> = {
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-rose-100 text-rose-700',
  info: 'bg-indigo-100 text-indigo-700',
};

const formatDate = (iso: string) =>
  formatThaiDateTime(iso, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const AdminImportsPage = () => {
  const [activeModal, setActiveModal] = useState<'CSV' | 'JSON' | null>(null);
  const [history, setHistory] = useState<ImportHistoryItem[]>([]);
  const [meta, setMeta] = useState<ImportHistoryMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [latestErrors, setLatestErrors] = useState<ImportErrorItem[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const fetchHistory = useCallback(async (targetPage = 1) => {
    try {
      setIsLoading(true);
      setFetchError('');
      const res = await getImportHistory({ page: targetPage, pageSize: 15 });
      setHistory(res.data);
      setMeta(res.meta);
    } catch {
      setFetchError('ไม่สามารถโหลดประวัติการนำเข้าได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory(1);
  }, [fetchHistory]);

  const handleImportCompleted = (result: ImportEventsResult, source: 'CSV' | 'JSON') => {
    setLatestErrors(result.errors || []);
    setFeedbackMessage(source === 'CSV' ? 'นำเข้าข้อมูล CSV สำเร็จ' : 'นำเข้าข้อมูล JSON สำเร็จ');
    fetchHistory(1);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 space-y-5">

      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">นำเข้าข้อมูลระบบ</h1>
            <p className="text-sm md:text-base text-muted mt-2">
              จัดการนำเข้าข้อมูลกิจกรรมจำนวนมากในรูปแบบ CSV และ JSON — แสดงประวัติของผู้ใช้ทั้งหมดในระบบ
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveModal('CSV')}
              className="h-10 px-4 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-surface-muted"
            >
              นำเข้า CSV
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('JSON')}
              className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95"
            >
              นำเข้า JSON
            </button>
          </div>
        </div>
      </div>

      {meta?.summary ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'สำเร็จ', value: meta.summary.status.success, cls: 'text-emerald-600' },
            { label: 'มีข้อผิดพลาด', value: meta.summary.status.partialSuccess, cls: 'text-amber-600' },
            { label: 'ล้มเหลว', value: meta.summary.status.failed, cls: 'text-rose-600' },
            { label: 'กำลังประมวลผล', value: meta.summary.status.processing, cls: 'text-indigo-600' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-surface border border-border px-4 py-3 shadow-sm">
              <p className="text-xs text-muted">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.cls}`}>{s.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      {meta?.summary ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-surface border border-border px-4 py-3 shadow-sm flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700 text-xs font-bold shrink-0">CSV</span>
            <div>
              <p className="text-xs text-muted">นำเข้าด้วย CSV</p>
              <p className="text-xl font-bold text-foreground">{meta.summary.type.csv}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-surface border border-border px-4 py-3 shadow-sm flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700 text-xs font-bold shrink-0">JSON</span>
            <div>
              <p className="text-xs text-muted">นำเข้าด้วย JSON</p>
              <p className="text-xl font-bold text-foreground">{meta.summary.type.json}</p>
            </div>
          </div>
        </div>
      ) : null}

      {feedbackMessage ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm">
          {feedbackMessage}
        </div>
      ) : null}

      {latestErrors.length > 0 ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">รายการที่นำเข้าไม่ผ่าน</h2>
          <div className="mt-3 space-y-2">
            {latestErrors.map((item, index) => (
              <div key={`${item.row}-${item.field}-${index}`} className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-amber-800">
                แถว {item.row} • {item.field} • {item.detail}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-foreground">ประวัติการนำเข้าทั้งหมด</h2>
          {meta ? <p className="text-xs text-muted">ทั้งหมด {meta.totalItems} รายการ</p> : null}
        </div>

        {isLoading ? (
          <div className="py-16 flex flex-col items-center gap-3 text-muted">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-sm">กำลังโหลด...</p>
          </div>
        ) : fetchError ? (
          <div className="py-12 flex flex-col items-center gap-3 text-rose-600">
            <p className="text-sm">{fetchError}</p>
            <button type="button" onClick={() => fetchHistory(meta?.page ?? 1)} className="text-xs underline underline-offset-2">ลองใหม่</button>
          </div>
        ) : history.length === 0 ? (
          <div className="py-16 text-center text-muted text-sm">ยังไม่มีประวัติการนำเข้าในระบบ</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="min-w-[980px] w-full">
                <thead className="bg-surface-muted/70">
                  <tr className="text-left text-xs uppercase tracking-wide text-muted">
                    <th className="px-4 py-3">Import ID</th>
                    <th className="px-4 py-3">ประเภท</th>
                    <th className="px-4 py-3">ทั้งหมด</th>
                    <th className="px-4 py-3">สำเร็จ</th>
                    <th className="px-4 py-3">ล้มเหลว</th>
                    <th className="px-4 py-3">อัตราสำเร็จ</th>
                    <th className="px-4 py-3">สถานะ</th>
                    <th className="px-4 py-3">นำเข้าโดย</th>
                    <th className="px-4 py-3">เวลา</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.importLogId} className="border-t border-border text-sm hover:bg-surface-muted/30 transition-colors">
                      <td className="px-4 py-4 font-semibold text-foreground">{item.importNo}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold ${item.importType === 'CSV' ? 'bg-sky-100 text-sky-700' : 'bg-violet-100 text-violet-700'}`}>
                          {item.importType}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-foreground">{item.totalRecords}</td>
                      <td className="px-4 py-4 text-emerald-700 font-semibold">{item.successRecords}</td>
                      <td className="px-4 py-4 text-rose-600 font-semibold">{item.failedRecords}</td>
                      <td className="px-4 py-4 text-muted text-xs">{item.metrics.successRate.toFixed(1)}%</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${STATUS_TONE_CLASS[item.statusTone]}`}>
                          {item.statusLabel}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-foreground leading-snug">{item.importedBy.fullName}</p>
                        <p className="text-xs text-muted leading-snug">{item.importedBy.role}</p>
                      </td>
                      <td className="px-4 py-4 text-muted whitespace-nowrap">{formatDate(item.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {meta && meta.totalPages > 1 ? (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-muted">หน้า {meta.page} / {meta.totalPages}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={meta.page <= 1}
                    onClick={() => fetchHistory(meta.page - 1)}
                    className="h-8 px-3 rounded-lg border border-border text-xs font-medium text-foreground disabled:opacity-40 hover:bg-surface-muted"
                  >
                    ก่อนหน้า
                  </button>
                  <button
                    type="button"
                    disabled={meta.page >= meta.totalPages}
                    onClick={() => fetchHistory(meta.page + 1)}
                    className="h-8 px-3 rounded-lg border border-border text-xs font-medium text-foreground disabled:opacity-40 hover:bg-surface-muted"
                  >
                    ถัดไป
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>

      <ImportUploadModal isOpen={activeModal === 'CSV'} mode="CSV" onClose={() => setActiveModal(null)} onCompleted={handleImportCompleted} />
      <ImportUploadModal isOpen={activeModal === 'JSON'} mode="JSON" onClose={() => setActiveModal(null)} onCompleted={handleImportCompleted} />
    </section>
  );
};
