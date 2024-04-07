import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipient = createAsyncThunk(
    'recipient/fetchRecipient',
    async (chat, thunkAPI) => {
        const members = chat.members;
        const currUserId = thunkAPI.getState().user.loggedUser._id;
        const recipientId = members.find(id => id !== String(currUserId));

        const res = await fetch(`http://localhost:3000/api/users/find/${recipientId}`, { credentials: 'include' });

        if (!res.ok) {
            throw new Error('Failed to fetch recipient');
        }
        const recipientData = await res.json();
        recipientData.chatId = chat._id;
        return recipientData;
    }
);



const initialState = {
    recipients: [],
    isRecipientLoading: false,
    error: null,
};

const recipientSlice = createSlice({
    name: 'recipient',
    initialState,
    reducers: {
        clearRecipients: (state) => {
            state.recipients = [];
        },
        setRecipientLoading: (state, { payload }) => {
            state.isRecipientLoading = payload;
        },
        addRecipient: (state, { payload }) => {
            state.recipients.push(payload);
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchRecipient.pending, (state) => {
            //     state.isRecipientLoading = true;
            // })
            .addCase(fetchRecipient.fulfilled, (state, { payload }) => {
                const existingRecipient = state.recipients.find(
                    (recipient) => recipient._id === payload._id
                );

                if (!existingRecipient) {
                    state.recipients.push(payload);
                }
            })
        // .addCase(fetchRecipient.rejected, (state, action) => {
        //     state.isRecipientLoading = false;
        //     state.error = action.error;
        //     console.error('Request for fetching recipient user rejected', action.error);
        // });

    },
});

export const { clearRecipients, setRecipientLoading, addRecipient } = recipientSlice.actions;

export default recipientSlice.reducer;
