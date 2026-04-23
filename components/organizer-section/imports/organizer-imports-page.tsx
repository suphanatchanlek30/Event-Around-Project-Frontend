"use client";

import { useMemo, useState } from 'react';

import type { ImportErrorItem, ImportEventsResult } from '@/services';

import { ORGANIZER_IMPORTS } from '../constants';
import type { OrganizerImportItem } from '../types';
import { ImportUploadModal } from './import-upload-modal';

const getStatusClassName = (status: string) => {
  if (status === 'SUCCESS') {
    return 'bg-emerald-100 text-emerald-700';
  }
  if (status === 'PARTIAL_SUCCESS') {
    return 'bg-amber-100 text-amber-700';
  }
  return 'bg-indigo-100 text-indigo-700';
};

const getStatusLabel = (status: string) => {
  if (status === 'SUCCESS') {
    return 'สำเร็จ';
  }
  if (status === 'PARTIAL_SUCCESS') {
    return 'มีข้อผิดพลาด';
  }
  return 'กำลังประมวลผล';
};

export const OrganizerImportsPage = () => {
  const [activeModal, setActiveModal] = useState<'CSV' | 'JSON' | null>(null);
  const [importHistory, setImportHistory] = useState<OrganizerImportItem[]>(ORGANIZER_IMPORTS);
  const [latestErrors, setLatestErrors] = useState<ImportErrorItem[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const latestImport = useMemo(() => importHistory[0], [importHistory]);

  const handleImportCompleted = (result: ImportEventsResult, source: 'CSV' | 'JSON') => {
    const nextItem: OrganizerImportItem = {
      importLogId: result.importLogId,
      source,
      totalRecords: result.totalRecords,
      successRecords: result.successRecords,
      failedRecords: result.failedRecords,
      createdAt: new Date().toLocaleString('th-TH', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: result.failedRecords > 0 ? 'PARTIAL_SUCCESS' : 'SUCCESS',
    };

    setImportHistory((prev) => [nextItem, ...prev.filter((item) => item.importLogId !== nextItem.importLogId)]);
    setLatestErrors(result.errors || []);
    setFeedbackMessage(
      source === 'CSV' ? 'นำเข้าข้อมูล CSV สำเร็จ' : 'นำเข้าข้อมูล JSON สำเร็จ',
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 space-y-5">
      <div className="rounded-2xl bg-surface border border-border p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">นำเข้าข้อมูลอีเวนต์</h1>
            <p className="text-sm md:text-base text-muted mt-2">
              รองรับการนำเข้าแบบ CSV และ JSON เพื่อสร้างกิจกรรมหลายรายการ
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveModal('CSV')}
              className="h-10 px-4 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-surface-muted"
            >
              อัปโหลด CSV
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('JSON')}
              className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95"
            >
              อัปโหลด JSON
            </button>
          </div>
        </div>
      </div>

      {feedbackMessage ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm">
          {feedbackMessage}
          {latestImport ? ` • Import #${latestImport.importLogId}` : ''}
        </div>
      ) : null}

      {latestErrors.length > 0 ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">รายการที่นำเข้าไม่ผ่าน</h2>
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
        <h2 className="text-2xl font-semibold text-foreground mb-4">ประวัติการนำเข้า</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="min-w-[760px] w-full">
            <thead className="bg-surface-muted/70">
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3">Import ID</th>
                <th className="px-4 py-3">ประเภท</th>
                <th className="px-4 py-3">จำนวนทั้งหมด</th>
                <th className="px-4 py-3">สำเร็จ</th>
                <th className="px-4 py-3">ล้มเหลว</th>
                <th className="px-4 py-3">สถานะ</th>
                <th className="px-4 py-3">เวลา</th>
              </tr>
            </thead>
            <tbody>
              {importHistory.map((item) => (
                <tr key={item.importLogId} className="border-t border-border text-sm">
                  <td className="px-4 py-4 font-semibold text-foreground">#{item.importLogId}</td>
                  <td className="px-4 py-4 text-muted">{item.source}</td>
                  <td className="px-4 py-4 text-foreground">{item.totalRecords}</td>
                  <td className="px-4 py-4 text-emerald-700 font-semibold">{item.successRecords}</td>
                  <td className="px-4 py-4 text-rose-600 font-semibold">{item.failedRecords}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClassName(item.status)}`}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted">{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ImportUploadModal
        isOpen={activeModal === 'CSV'}
        mode="CSV"
        onClose={() => setActiveModal(null)}
        onCompleted={handleImportCompleted}
      />

      <ImportUploadModal
        isOpen={activeModal === 'JSON'}
        mode="JSON"
        onClose={() => setActiveModal(null)}
        onCompleted={handleImportCompleted}
      />
    </section>
  );
};
