import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import logImg from '../../assets/images/logo.svg';
import "../Home/auth.scss";
import { Button } from '../Button/Button';
import { database } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth';

export function NewRoom() {
    const {user} = useAuth();
    const navigate = useNavigate();
    const[newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if(newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        navigate(`/rooms/${firebaseRoom.key}`)

    }
    
    return (
        <div id="page-auth"> 
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie Salas de Q&amp;A ao-vivo</strong>
                <p>Tire suas dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                <img src={logImg} alt="letmeask" />
                <h2>Criar uma nova sala</h2>
                <form onSubmit={handleCreateRoom}>
                   <input 
                    type="text" 
                    placeholder="Nome da Sala"
                    onChange={event => setNewRoom(event.target.value)}
                    value={newRoom}
                   /> 
                   <Button type="submit">
                    Criar Sala
                   </Button>
                </form>
                <p>
                    Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                </p>
                </div>
            </main>
        </div>
    )
}