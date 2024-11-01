export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
}

export const login = async (data: ILoginRequest): Promise<ILoginResponse> => {
  const response = await fetch('http://localhost:3001/api/users/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const tokenInfo = await response.json()
  console.log(tokenInfo)

  return tokenInfo
}