import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { updateProductAction } from "@/app/actions";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  // เติม: ค่าที่ Next 16 ทำเป็น Promise จึงต้อง await
  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }

  // เติม: เมธอดที่ผูกอาร์กิวเมนต์แรกให้ฟังก์ชันไว้ล่วงหน้า
  const updateAction = updateProductAction.bind(null, product.id);

  return (
    // เพิ่ม className: จำกัดความกว้างให้แคบกว่าหน้าหลัก (ฟอร์มไม่ควรกว้างเกินไป), จัดกึ่งกลาง, เว้นขอบรอบๆ
    <main className="max-w-md mx-auto p-6">
      {/* เพิ่ม className: หัวข้อตัวใหญ่ หนา และเว้นระยะด้านล่าง */}
      <h1 className="text-2xl font-bold mb-6">แก้ไขสินค้า</h1>
      {/* เพิ่ม className: เรียงช่องกรอกในแนวตั้ง เว้นระยะระหว่างช่อง */}
      <form action={updateAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          {/* เพิ่ม className: ป้ายชื่อตัวเล็ก กึ่งหนา */}
          <label htmlFor="name" className="text-sm font-semibold">
            ชื่อสินค้า
          </label>
          {/* เพิ่ม className: ใส่ขอบ มุมโค้ง เว้นระยะด้านใน (ใช้แบบเดียวกันกับทุกช่องกรอก) */}
          <input
            id="name"
            name="name"
            defaultValue={product.name}
            required
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm font-semibold">
            ราคา
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            defaultValue={product.price}
            required
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-semibold">
            รายละเอียด
          </label>
          {/* เพิ่ม className: เหมือนช่องกรอกอื่น แต่กำหนดความสูงขั้นต่ำ (h-28 = 7rem) */}
          <textarea
            id="description"
            name="description"
            defaultValue={product.description}
            required
            className="border rounded px-3 py-2 h-28"
          />
        </div>
        {/* เพิ่ม className: ปุ่มบันทึกกับลิงก์ยกเลิกเรียงแนวนอน จัดกลางแนวตั้ง */}
        <div className="flex items-center gap-4">
          {/* เพิ่ม className: ปุ่มพื้นน้ำเงิน ตัวอักษรขาว มุมโค้ง และเข้มขึ้นเมื่อชี้เมาส์ */}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            บันทึก
          </button>
          {/* เพิ่ม className: ลิงก์ยกเลิกสีเทา มีขีดเส้นใต้เมื่อชี้เมาส์ */}
          <Link href="/" className="text-gray-600 hover:underline">
            ยกเลิก
          </Link>
        </div>
      </form>
    </main>
  );
}