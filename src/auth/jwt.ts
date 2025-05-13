import * as jwt from 'jsonwebtoken';

async function createAccessToken(userId: string){
    // Generar un token de acceso con una clave secreta y una duración de 1 hora
    return new Promise((resolve, rejects) => {
        jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token)=>{
            if (err) {
                console.error('Error al crear el token de acceso:', err);
                rejects(err);
            }
            resolve(token);
        });
    });
}

export default createAccessToken;