import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import statusCode from '../../utils/statusCode'

const initialState = {
    users: [],
    status: statusCode.IDLE
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsers(state, action) {
            state.users = action.payload
        },
        removeUser: (state, action) => {
            const userId = action.payload
            console.log(state.users, userId)
            state.users = state.users.filter(user => user.id !== userId)
            console.log(state.users, userId)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
            state.status = statusCode.LOADING
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.status = statusCode.IDLE
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.status = statusCode.ERROR
        })

    }
})
export const { removeUser } = usersSlice.actions
export default usersSlice.reducer

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await data.json()
        return result
    }
)

