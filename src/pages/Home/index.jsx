import React, { useState, useEffect } from 'react'

import './style.css'

import { Card } from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: '', avatar: '' })

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    }

    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    // Body of the userEffect
    async function fetchData() {
      const response = await fetch(`https://api.github.com/users/${studentName}`)
      const data = await response.json()

      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }

    fetchData()
  }, [students])

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil" />
        </div>
      </header>
      <input 
        type="text" name="" id="" 
        placeholder="Digite seu nome do github..." 
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>Adicionar</button>

      {
        students.map(student => 
          <Card
            key={student.time}
            name={student.name}
            time={student.time}
          />
        )
      }
    </div>
  )
}