// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
<<<<<<< Tabnine <<<<<<<
import Providers from 'next-auth/providers';
>>>>>>> Tabnine >>>>>>>// {"conversationId":"ab57ed65-2c77-4171-b827-8c6ea3259678","source":"instruct"}

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // Add more providers as needed
    ],
    // Optional: Add custom pages, callbacks, or other configurations
});