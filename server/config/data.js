import mongoose from 'mongoose'
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      `mongodb+srv://naveen:naveen6244@cluster0.wclfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log(`mongoDb connected :${connect.connection.host}`)
  } catch (error) {
    console.log(error.message)
  }
}
export default connectDB
