const init = () => {
  return {
    devMode: !!parseInt(process.env.DEV_MODE),
    postgresql: {
      connectionString: process.env.DATABASE_URL
    }
  }
}

export default init()
