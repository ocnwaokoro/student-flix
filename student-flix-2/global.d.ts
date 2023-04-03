declare global{
    namespace NodeJS{
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production'
        }
    }
}

// logo primary color etc used here

export {}