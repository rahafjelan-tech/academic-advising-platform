// مستخدمين تجريبين (بس للاختبار، مو حقيقيين)
const users = [
  { id: "s12345", password: "1234", role: "student" },
  { id: "a98765", password: "1234", role: "advisor" },
  { id: "e11111", password: "1234", role: "employee" }
];

// نجيب الفورم ورسالة الخطأ من الصفحة
const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

// لما المستخدم يضغط "تسجيل دخول"
form.addEventListener("submit", function (event) {
  event.preventDefault(); // لا تعيد تحميل الصفحة

  // نقرأ القيم من الحقول
  const userId = document.getElementById("userId").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  // نتأكد إن الحقول مو فاضية
  if (!userId || !password || !role) {
    errorMessage.textContent = "الرجاء تعبئة جميع الحقول.";
    return;
  }

  // ندوّر على مستخدم يطابق البيانات
  const user = users.find(function (u) {
    return u.id === userId && u.password === password && u.role === role;
  });

  // لو ما لقينا مستخدم
  if (!user) {
    errorMessage.textContent = "بيانات الدخول غير صحيحة.";
    return;
  }

  // لو البيانات صحيحة نمسح رسالة الخطأ
  errorMessage.textContent = "";

  // نقدر نخزن بياناته لو حبينا نستخدمها بعدين
  localStorage.setItem(
    "currentUser",
    JSON.stringify({ id: user.id, role: user.role })
  );

  // نوجّهه للصفحة الصحيحة حسب الدور
  if (user.role === "student") {
    window.location.href = "student.html";
  } else if (user.role === "advisor") {
    window.location.href = "advisor.html";
  } else if (user.role === "employee") {
    window.location.href = "employee.html";
  }
});
