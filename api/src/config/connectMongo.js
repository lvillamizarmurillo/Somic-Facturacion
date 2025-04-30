import { loadEnv } from 'vite';
import { MongoClient } from 'mongodb';

const env = loadEnv('development', process.cwd(), 'URI_MONGODB')

export default class Coneccion{
    static instancia;
    coneccion = new MongoClient(env.URI_MONGODB);
    dbnombre = '';
    dbcoleccion = 'somic';
    db;

    static getInstancia(){
        if(Coneccion.instancia instanceof Coneccion) return Coneccion.instancia
        Coneccion.instancia = new Coneccion
        return Coneccion.instancia
    }

    elegirColeccion(nombre){
        this.dbnombre = nombre;
        return Coneccion.instancia
    }

    conectar(){
        this.db = this.coneccion.db(this.dbcoleccion).collection(this.dbnombre)
        return this.db;
    }
}