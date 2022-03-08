import { LocalStorageHelper } from "../models/localstorage/LocalStorageHelper";
import { ApiClient } from "./ApiClient";

export class StudyApi {

    static async restudyStart(studySessionId: string) {
        const client = new ApiClient()
        const userId = LocalStorageHelper.getUserId()
        if (!userId || !studySessionId) console.error("userIdもしくはstudySessionIdがありません") //ローカルではエラーにする
        const res = await client.post(
            "/study/restudy",
            {
                userId,
                studySessionId
            }
        )
        const { topicTitle, topicDescription, topicId, japanese } = res.data
        return { topicTitle, topicDescription, topicId, japanese }
    }

    static async studyStart(categorySlug?: string) {
        const client = new ApiClient()
        const userId = LocalStorageHelper.getUserId()
        if (!userId) console.error("userIdがありません")
        const res = await client.post(
            "/study/start",
            { userId, categorySlug: categorySlug || "" }
        )
        const { studySessionId } = res.data

        LocalStorageHelper.saveStudySessionId(studySessionId)
        return { studySessionId }
    }

    static async getTopic() {
        const userId = LocalStorageHelper.getUserId()
        const studySessionId = LocalStorageHelper.getStudySessionId()
        if (!userId || !studySessionId) console.error("userIdもしくはstudySessionIdがありません")
        const client = new ApiClient()
        const res = await client.post(
            "/study/topic",
            {
                userId: userId,
                studySessionId: studySessionId
            }
        )
        const { topicTitle, topicDescription, topicId } = res.data
        return { topicTitle, topicDescription, topicId }
    }

    static async sendJapanese(japanese: string) {
        const client = new ApiClient()
        const userId = LocalStorageHelper.getUserId()
        const studySessionId = LocalStorageHelper.getStudySessionId()
        if (!userId || !studySessionId) console.error("userIdもしくはstudySessionIdがありません")

        const res = await client.post(
            "/study/japanese",
            {
                userId,
                studySessionId,
                japanese: japanese
            }
        )
        const { success, message } = res.data
        return { success, message }
    }

    static async sendEnglish(english: string) {
        const client = new ApiClient()
        const userId = LocalStorageHelper.getUserId()
        const studySessionId = LocalStorageHelper.getStudySessionId()
        if (!userId || !studySessionId) console.error("userIdもしくはstudySessionIdがありません")

        const res = await client.post(
            "/study/english",
            {
                userId,
                studySessionId,
                english
            }
        )
        const { success, message } = res.data
        return { success, message }
    }

    static async translate(japanese: string, contextualText: string) {
        const client = new ApiClient()
        const userId = LocalStorageHelper.getUserId()
        const studySessionId = LocalStorageHelper.getStudySessionId()
        if (!userId || !studySessionId) console.error("userIdもしくはstudySessionIdがありません")

        const res = await client.post(
            "/study/translation",
            {
                userId,
                studySessionId,
                japanese,
                contextualText
            }
        )
        const { translation } = res.data
        return { translation }
    }

    static async leftHeart() {
        const client = new ApiClient()
        const userId = LocalStorageHelper.getUserId()
        if (!userId) console.error("userIdがありません")

        const res = await client.post(
            "/study/left_heart",
            {
                userId
            }
        )
        const { leftHeart } = res.data
        return { leftHeart }
    }
}