import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import { database } from '../../services/firebase'

import illustrationImg from '../../assets/images/illustration.svg';
import logImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { Button } from '../Button/Button';
import { useAuth } from '../../hooks/useAuth';

import "../Home/auth.scss";


export function Home() {
    const navigate = useNavigate();
    const {user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
        
    async function handleCreateRoom() {    
        if (!user) {
            await signInWithGoogle()
        }
        
        navigate('/rooms/news')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
          }
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert('Room does not exist.')
            return;
        }

        navigate(`/rooms/${roomCode}`);
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
                <button onClick={handleCreateRoom}className= "create-room">
                    <img src={googleIconImg} alt="logo do google" />
                    Crie sua sala com o google
                </button>
                <div className="separator">ou entre em uma sala</div>
                <form onSubmit={handleJoinRoom}>
                   <input 
                    type="text" 
                    placeholder="Digite o código da sala "
                    onChange={event => setRoomCode(event.target.value)}
                    value={roomCode}
                   /> 
                   <Button type="submit">
                    Entrar na sala
                   </Button>
                </form>
                </div>
            </main>
        </div>
    )
};