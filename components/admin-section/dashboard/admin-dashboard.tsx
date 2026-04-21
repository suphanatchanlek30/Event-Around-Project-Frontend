import { AdminStatsCards } from './admin-stats-cards';
import { PendingApprovalsTable } from './pending-approvals-table';

export const AdminDashboard = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-8 space-y-5 md:space-y-7">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">แดชบอร์ดผู้ดูแลระบบ</h1>
        <p className="text-sm md:text-base text-muted mt-2">
          ภาพรวมการจัดการอีเวนต์ คำขออนุมัติ หมวดหมู่ และประวัติการนำเข้าข้อมูล
        </p>
      </div>

      <AdminStatsCards />
      <PendingApprovalsTable />
    </section>
  );
};
