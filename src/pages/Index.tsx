import { POSInterface } from "@/components/POSInterface";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <POSInterface />
      <div className="fixed bottom-4 right-4">
        <Link to="/shift-report">
          <button className="px-4 py-2 bg-blue-600 text-white rounded shadow">
            📊 Laporan Shift
          </button>
        </Link>
      </div>
    </>
  );
};

export default Index;
