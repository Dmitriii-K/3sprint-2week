import { ObjectId } from "mongodb";
// import { blogCollection, commentCollection, postCollection } from "../db/mongo-db";
import { PostDbType, PostInputModel } from "../input-output-types/posts-type";
import { CommentDBType } from "../input-output-types/comments-type";
import { BlogModel, CommentModel, PostModel } from "../db/schema-model-db";

export class PostRepository {
    static async findBlogNameForId (id: string) {
        const newId = new ObjectId(id);
        return BlogModel.findOne({ _id: newId });
    }
    static async findPostById (id: string) {
        const newId = new ObjectId(id)
        return PostModel.findOne({_id: newId})
    }
    static async insertPost (data: PostDbType) {
        const result = PostModel.create(data);
        return (await result)._id.toString()
    }
    static async insertComment (data: CommentDBType) {
        const result = CommentModel.create(data);
        return (await result)._id.toString()
    }
    static async updatePost (post: PostInputModel, id: string) {
        const mongoId = new ObjectId(id);
        const result = PostModel.updateOne({_id: mongoId}, {$set: post})
        return (await result).modifiedCount === 1
    }
    static async deletePost (id: string) {
        const mongoId = new ObjectId(id);
        const result = await PostModel.deleteOne({_id: mongoId})
        return result.deletedCount === 1
    }
}