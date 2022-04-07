import { ConstructionOutlined } from "@mui/icons-material"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { LevelApi } from "../../api/LevelApi"
import { CongratModalDisplayAtom, LevelAtom, LevelCardDisplayAtom, PrevLevelAtom } from "../jotai/User"

export default () => {
    const [level, setLevel] = useAtom(LevelAtom)
    const [prevLevel, setPrevLevel] = useAtom(PrevLevelAtom)
    const [display, setDisplay] = useAtom(LevelCardDisplayAtom)
    const [openCongrat, setOpenCongrat] = useAtom(CongratModalDisplayAtom)

    useEffect(() => {
        //現在のレベルを設定
        LevelApi.getLevel().then(res => {
            setLevel(res)
        })
    }, [])

    const addExp = (exp: number, studySessionId: string) => {
        LevelApi.addExp(exp, studySessionId).then(res => {
            //現在のレベルを設定
            setPrevLevel(res.prevLevel)
            setLevel(res.currentLevel)

            if (res.prevLevel.level === res.currentLevel.level && res.prevLevel.levelExp === res.currentLevel.levelExp) {
                //何も変わってないので何もしない
                return
            }
            displayCard()

            //レベルアップ
            if (res.currentLevel.level > res.prevLevel.level) {
                setLevel({
                    ...res.prevLevel,
                    level: res.currentLevel.level,
                    levelExp: res.currentLevel.needExp
                })
                setOpenCongrat(true)
            }
        })
    }

    const displayCard = () => {
        setDisplay(true)

        //非表示にする
        setTimeout(() => {
            setDisplay(false)
        }, 5000)
    }
    return { level, prevLevel, addExp, display, displayCard, openCongrat, setOpenCongrat }
}