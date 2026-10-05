import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { deleteProductAction } from "@/app/actions";

type DeleteProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DeleteProductPage({
  params,
}: DeleteProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    // เติม: ฟังก์ชันที่พาผู้ที่ยังไม่ล็อกอินกลับหน้าแรก
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(id);
  if (!product) {
    notFound();
  }

  const deleteAction = deleteProductAction.bind(null, product.id);

  return (
    // เพิ่ม className: จำกัดความกว้างให้แคบ (เหมือนหน้าแก้ไข), จัดกึ่งกลาง, เว้นขอบรอบๆ
    <main className="max-w-md mx-auto p-6">
      {/* เพิ่ม className: หัวข้อตัวใหญ่ หนา สีแดงเพื่อเตือนว่าเป็นการลบ และเว้นระยะด้านล่าง */}
      <h1 className="text-2xl font-bold text-red-600 mb-4">ยืนยันการลบ</h1>
      {/* เพิ่ม className: ข้อความถามยืนยัน เว้นระยะด้านล่าง */}
      <p className="mb-6">ต้องการลบสินค้า “{product.name}” หรือไม่?</p>
      {/* เพิ่ม className: ปุ่มยืนยันกับลิงก์ยกเลิกเรียงแนวนอน จัดกลางแนวตั้ง */}
      <div className="flex items-center gap-4">
        <form action={deleteAction}>
          {/* เพิ่ม className: ปุ่มพื้นแดง ตัวอักษรขาว มุมโค้ง และเข้มขึ้นเมื่อชี้เมาส์ */}
          <button
            type="submit"
            className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700"
          >
            ยืนยันการลบ
          </button>
        </form>
        {/* เพิ่ม className: ลิงก์ยกเลิกสีเทา มีขีดเส้นใต้เมื่อชี้เมาส์ (เหมือนหน้าแก้ไข) */}
        <Link href="/" className="text-gray-600 hover:underline">
          ยกเลิก
        </Link>
      </div>
    </main>
  );
}