import Link from "next/link";
import { auth } from "@/auth";
import { getProducts } from "@/lib/products";
import { AuthButtons } from "@/component/auth-buttons";

export default async function HomePage() {
  const session = await auth();
  const products = getProducts();
  // เติม: ฟังก์ชันที่แปลงค่าเป็น true หรือ false
  const isLoggedIn = !!session?.user;

  return (
    // เพิ่ม className: จำกัดความกว้างสูงสุด, จัดกึ่งกลางหน้า, เว้นขอบรอบๆ
    <main className="max-w-4xl mx-auto p-6">
      {/* เพิ่ม className: จัดให้เรียงแนวนอน ชื่ออยู่ซ้าย ปุ่มอยู่ขวา และเว้นระยะด้านล่าง */}
      <header className="flex items-center justify-between mb-6">
        {/* เพิ่ม className: ตัวอักษรใหญ่ขึ้นและหนา */}
        <h1 className="text-2xl font-bold">สินค้า</h1>
        <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} />
      </header>

      {/* เพิ่ม className: จัดเป็น grid เว้นช่องไฟ 1 คอลัมน์บนมือถือ, 2 คอลัมน์ตั้งแต่จอ sm, 3 คอลัมน์ตั้งแต่จอ lg */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          // เพิ่ม className: ใส่ขอบ, มุมโค้ง, เว้นระยะด้านใน, เงาเบาๆ (data-testid เดิมยังอยู่)
          <article
            key={product.id}
            data-testid="product"
            className="border rounded-lg p-4 shadow-sm"
          >
            {/* เพิ่ม className: ชื่อสินค้าตัวใหญ่และกึ่งหนา */}
            <h2 className="text-lg font-semibold">{product.name}</h2>
            {/* เพิ่ม className: คำอธิบายสีเทา ตัวเล็ก เว้นระยะด้านบน */}
            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
            {/* เพิ่ม className: ราคาตัวหนา เว้นระยะด้านบน */}
            <p className="font-bold mt-2">
              ฿{product.price.toLocaleString("th-TH")}
            </p>
            {isLoggedIn && (
              // เพิ่ม className: ลิงก์แก้ไข/ลบเรียงแนวนอน เว้นช่องไฟ ตัวเล็ก เว้นระยะด้านบน
              <div className="flex gap-3 mt-3 text-sm">
                <Link
                  href={`/products/${product.id}/edit`}
                  // เพิ่ม className: สีน้ำเงิน และมีขีดเส้นใต้เมื่อชี้เมาส์
                  className="text-blue-600 hover:underline"
                >
                  แก้ไข
                </Link>
                <Link
                  href={`/products/${product.id}/delete`}
                  // เพิ่ม className: สีแดง และมีขีดเส้นใต้เมื่อชี้เมาส์
                  className="text-red-600 hover:underline"
                >
                  ลบ
                </Link>
              </div>
            )}
          </article>
        ))}
        {products.length === 0 && (
          // เพิ่ม className: ข้อความ "ไม่มีสินค้า" เป็นสีเทา
          <p className="text-gray-500">ไม่มีสินค้า</p>
        )}
      </div>
    </main>
  );
}