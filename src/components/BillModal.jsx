import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFileDownload, FaTimes, FaMinus, FaPlus } from "react-icons/fa";

function BillModal({ cart, onClose, onUpdateQuantity }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Grocery Bill", 70, 20);

    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 30);

    const tableData = cart.map(item => [
      item.title,
      item.qty.toString(),
      `Rs ${item.price.toFixed(2)}`,
      `Rs ${(item.price * item.qty).toFixed(2)}`,
    ]);

    autoTable(doc, {
      head: [["Item", "Qty", "Unit Price", "Total"]],
      body: tableData,
      startY: 40,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      margin: { top: 10, left: 14, right: 14 },
    });

    const finalY = doc.lastAutoTable?.finalY || 60;
    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text(`Grand Total: Rs ${total.toFixed(2)}`, 14, finalY + 10);
    doc.save("Grocery_Bill.pdf");
  };

  return (
    <dialog id="bill_modal" className="modal modal-open">
      <motion.div
        className="modal-box animate-zoom-in"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="font-bold text-lg">Bill Summary</h3>
        <ul className="py-2 space-y-2">
          {cart.map((item, i) => (
            <li key={i} className="flex justify-between items-center">
              <span className="w-2/5 font-medium">{item.title}</span>
              <div className="flex items-center gap-2">
                <button
                  className="btn btn-xs btn-outline btn-circle"
                  onClick={() => onUpdateQuantity(item.title, -1)}
                >
                  <FaMinus />
                </button>
                <span className="px-2 font-semibold">{item.qty}</span>
                <button
                  className="btn btn-xs btn-outline btn-circle"
                  onClick={() => onUpdateQuantity(item.title, 1)}
                >
                  <FaPlus />
                </button>
              </div>
              <span className="w-1/3 text-right font-semibold">
                Rs {item.price.toFixed(2)} × {item.qty} = Rs {(item.price * item.qty).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <p className="font-bold mt-4 text-right">Grand Total: Rs {total.toFixed(2)}</p>
        <div className="modal-action">
          <button className="btn btn-success" onClick={downloadPDF}>
            <FaFileDownload className="mr-2" /> Download Bill
          </button>
          <button className="btn" onClick={onClose}>
            <FaTimes className="mr-1" /> Close
          </button>
        </div>
      </motion.div>
    </dialog>
  );
}

export default BillModal;