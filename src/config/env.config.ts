

export const EnvConfiguration = () => ({

    port: process.env.PORT || 3005,
    mongourl: process.env.MONGODB,
    defaultLimit: process.env.DEFAULT_LIMIT || 10

})