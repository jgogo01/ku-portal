const getFooterYear = () => {
  const currentYear = new Date().getFullYear();
  return currentYear;
}

export default function Footer() {
  const year = getFooterYear();
  return (
      <>
        <footer className="flex-shrink-0 py-8 mt-auto">
          <div className="container mx-auto px-6">
            <div className="text-center text-sm text-gray-500 font-light">
              <p>© {year} มหาวิทยาลัยเกษตรศาสตร์</p>
              <p className="mt-2">
                พัฒนาโดย ฝ่ายระบบคอมพิวเตอร์และเครือข่าย สำนักบริการคอมพิวเตอร์ มหาวิทยาลัยเกษตรศาสตร์
              </p>
            </div>
          </div>
        </footer>
  </>
  );
}