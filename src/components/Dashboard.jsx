import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment-timezone';
import 'moment/locale/id';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

function Dashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/time');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [selectedTime, setSelectedTime] = useState('00:00');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pax, setPax] = useState(1);
  const [telp, setTelp] = useState('');
  const form = useRef();
  const sendEmail = () => {
    emailjs
      .sendForm('service_2dqvsgm', 'template_icjvj3x', form.current, {
        publicKey: '09842xSBH_CmsAFbd',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  const saveReservationData = async () => {
    if (!selectedTime) {
      alert('Pilih waktu terlebih dahulu!');
      return;
    }

    const tomorrow = moment().add(1, 'day').startOf('day');
    const formattedDateTime = moment(tomorrow)
      .set('hour', parseInt(selectedTime.split(':')[0]))
      .set('minute', parseInt(selectedTime.split(':')[1]));

    try {
      const response = await axios.get(`http://localhost:5000/tanggal/${formattedDateTime}`);
      if (response.data.exists) {
        alert('Waktu sudah ada yang pesan. Pilih tanggal yang lain.');
        navigate('/');
      } else {
        // Menemukan ID waktu yang sesuai dengan selectedTime
        const selectedTimeId = data.find((item) => item.waktu === selectedTime).id;

        // Memperbarui status 'active' pada entri waktu yang dipilih
        await axios.patch(`http://localhost:5000/time/${selectedTimeId}`, { active: false });

        // Membuat reservasi baru
        await axios.post('http://localhost:5000/booked', {
          name,
          email,
          pax,
          telp,
          tanggal: formattedDateTime,
          active: true,
        });

        Swal.fire({
          title: 'Success',
          text: 'Please check the Email',
          icon: 'success',
        });
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveButtonClick = async (e) => {
    e.preventDefault();
    await saveReservationData();
    sendEmail();
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  return (
    <>
      <div className="containerDash">
        <form ref={form}>
          <fieldset>
            <label className="label">Name</label>
            <input type="text" className="input" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" />
          </fieldset>
          <fieldset>
            <label className="label">Email</label>
            <input type="text" className="input" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
          </fieldset>

          <fieldset>
            <label className="label">No.HP / WhatsApp</label>
            <input type="number" className="input" onChange={(e) => setTelp(e.target.value)} value={telp} placeholder="ex 0822xx" />
          </fieldset>

          <fieldset>
            <label className="label">Pax</label>
            <select value={pax} onChange={(e) => setPax(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </fieldset>

          <fieldset>
            <label className="label">Select a Time:</label>
            <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
              <option value="">Choose a time</option>
              {data.map((item) => (
                <option key={item.id} value={item.waktu} disabled={!item.active}>
                  {item.waktu} {item.active ? '(Available)' : '(Not available)'}
                </option>
              ))}
            </select>
          </fieldset>
          <button type="submit" className="button is-success" onClick={handleSaveButtonClick}>
            Simpan
          </button>
        </form>
      </div>
    </>
  );
}

export default Dashboard;
