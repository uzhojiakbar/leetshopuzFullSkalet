import React, { useState } from "react";
import axios from "axios";

function App() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sessionCreated, setSessionCreated] = useState(false);
  const [phoneCodeHash, setPhoneCodeHash] = useState("");

  const handlePhoneSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/send-code", {
        phone,
      });
      console.log(res.data.phoneCodeHash);
      setPhoneCodeHash(res?.data?.phoneCodeHash);
      alert("Tasdiqlash kodi yuborildi!");
    } catch (error) {
      console.error("Xato: ", error);
      alert("Tasdiqlash kodi yuborishda xatolik yuz berdi!");
    }
  };

  const handleCodeSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify-code",
        { phone, code, phoneCodeHash }
      );
      if (response.data.success) {
        setSessionCreated(true);
        alert("Sessiya yaratildi!");
      } else {
        alert("Kod xato yoki yaroqsiz!");
      }
    } catch (error) {
      console.error("Xato: ", error);
      alert("Sessiya yaratishda xatolik yuz berdi!");
    }
  };

  return (
    <div>
      <h1>Telegram Login</h1>
      {!sessionCreated ? (
        <div>
          <div>
            <input
              type="text"
              placeholder="Telefon raqamingizni kiriting"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={handlePhoneSubmit}>Kod yuborish</button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Tasdiqlash kodini kiriting"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleCodeSubmit}>Sessiya yaratish</button>
          </div>
        </div>
      ) : (
        <h2>Sessiya muvaffaqiyatli yaratildi!</h2>
      )}
    </div>
  );
}

export default App;
