interface PaginationProps {
  currentCount: number;
  totalCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentCount, totalCount }) => {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200/50">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          แสดง 1-{currentCount} จากทั้งหมด {totalCount} รายการ
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-sm text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed" disabled>
            ก่อนหน้า
          </button>
          <span className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg font-medium">
            1
          </span>
          <button className="px-4 py-2 text-sm text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed" disabled>
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
