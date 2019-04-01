module.exports = {
    apps : [{
      name: "recruit-easy-service",
      script: "npm",
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }