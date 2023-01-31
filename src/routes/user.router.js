import { Router } from 'express';
import { changeUsername, createGoogleUser, createMetamaskUser, getUser, googleLogin, metamaskLogin , logOut, connectAddress, refreshToken } from '../controllers/user.controller.js';
import { requireToken , requireRefreshToken , verifyUsername } from '../middlewares/auth.mid.js';
import { validatorChangeName, validatorCrearUsuario } from '../validators/user.validator.js';


const router = Router();


router.post('/metamaskLogin' , metamaskLogin);  //Verifica mensaje y loguea de ser correcto
router.post('/googleLogin' , googleLogin)
router.put('/connectAddress' ,  requireToken , connectAddress)
router.get('/logout', logOut);  
router.get('/refreshToken' , requireRefreshToken , refreshToken)
router.post('/createMetamaskUser', requireToken, validatorCrearUsuario, verifyUsername, createMetamaskUser);  //Crea user
router.post('/createGoogleUser'/*  ,validatorCrearUsuario  */, verifyUsername , createGoogleUser )
router.get('/getUser', requireToken, getUser); //Ruta protegida, requiere token auth y devuelve info del usuario.
router.post('/changeUsername', requireToken, validatorChangeName , changeUsername);


export default router;
