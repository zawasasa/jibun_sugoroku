// ささの自分すごろく - イベントデータ (Phase 1: ポジティブイベントのみ)

const events = {
  positive: [
    // 仕事・教育実践 (25個)
    {
      id: 1,
      text: "職員室でNotebookLMの使い方教えたら教頭先生の業務が減った",
      effect: { type: "move", value: 2 }
    },
    {
      id: 2,
      text: "AI漫画生成ワークフローがバズって、絵が描けない先生から感謝のDMが殺到!",
      effect: { type: "move", value: 3 }
    },
    {
      id: 3,
      text: "「ささっと」Chrome拡張がダウンロード100件突破!",
      effect: { type: "move", value: 2 }
    },
    {
      id: 4,
      text: "学習振り返りアプリV3で生徒の記述が2倍に!",
      effect: { type: "move", value: 3 }
    },
    {
      id: 5,
      text: "Xのフォロワーが2,000人突破!影響力アップ",
      effect: { type: "move", value: 2 }
    },
    {
      id: 6,
      text: "410台のiPad管理システムが他校から視察依頼",
      effect: { type: "move", value: 3 }
    },
    {
      id: 7,
      text: "Google AI Studioでプロンプト改善、生成品質が劇的向上",
      effect: { type: "move", value: 2 }
    },
    {
      id: 8,
      text: "YAMLテンプレートで1発で理想の漫画が完成!",
      effect: { type: "move", value: 3 }
    },
    {
      id: 9,
      text: "noteの記事が教育系メディアに取り上げられた",
      effect: { type: "move", value: 2 }
    },
    {
      id: 10,
      text: "職員会議の議事録自動生成が大好評",
      effect: { type: "move", value: 2 }
    },
    {
      id: 11,
      text: "Whisper APIの音声メモ機能で先生たちの報告書作成時間半減",
      effect: { type: "move", value: 3 }
    },
    {
      id: 12,
      text: "無料配布したツールが全国100校で使われてる!",
      effect: { type: "move", value: 4 }
    },
    {
      id: 13,
      text: "DIFYワークフローが予想以上にスムーズに動いた",
      effect: { type: "move", value: 2 }
    },
    {
      id: 14,
      text: "「苦しい忙しさ」を「楽しい忙しさ」に変えた実践が論文化",
      effect: { type: "move", value: 3 }
    },
    {
      id: 15,
      text: "Gemini 2.5 Proの新機能を即座に授業活用",
      effect: { type: "move", value: 2 }
    },
    {
      id: 16,
      text: "学校ルール案内チャットボットで生徒の質問対応が自動化",
      effect: { type: "move", value: 2 }
    },
    {
      id: 17,
      text: "テンプレート管理ツールで教材作成時間が1/3に",
      effect: { type: "move", value: 2 }
    },
    {
      id: 18,
      text: "NotebookLM研修後、全職員が実際に使い始めた!",
      effect: { type: "move", value: 4 }
    },
    {
      id: 19,
      text: "Culture Hackerとしての講演依頼が来た",
      effect: { type: "move", value: 3 }
    },
    {
      id: 20,
      text: "Google Apps Scriptの新作ツールがトレンド入り",
      effect: { type: "move", value: 2 }
    },
    {
      id: 21,
      text: "AI活用授業が教育委員会から表彰された",
      effect: { type: "move", value: 3 }
    },
    {
      id: 22,
      text: "ブログ記事が月間PV 1万突破!",
      effect: { type: "move", value: 2 }
    },
    {
      id: 23,
      text: "ファイル共有自動化システムで職員の残業時間削減",
      effect: { type: "move", value: 2 }
    },
    {
      id: 24,
      text: "教育実践コミュニティで「MVPツール開発者」に選ばれた",
      effect: { type: "move", value: 3 }
    },
    {
      id: 25,
      text: "若手教員がささのツールで授業改善に成功!",
      effect: { type: "move", value: 2 }
    },

    // 家族・週末・日常 (30個)
    {
      id: 26,
      text: "寒空の下、娘の公園遊びを見守りながらコーヒー片手に読書・音楽・Claudeで算数アプリ開発。家族時間と創作時間が重なって「これが最高の週末」と心から実感",
      effect: { type: "move", value: 4 }
    },
    {
      id: 27,
      text: "日曜夜の憂鬱を「月曜の仕事は月曜にやればいい」と割り切ったら、心に余白が生まれ、週末最後の時間を新しいAIツール試しに充てられてリフレッシュ",
      effect: { type: "move", value: 3 }
    },
    {
      id: 28,
      text: "通勤30分のVoicy学習が習慣化し、片道だけで新しいAI活用アイデアが次々浮かぶ。日常の移動時間が学びと創作の宝庫に変わった",
      effect: { type: "move", value: 2 }
    },
    {
      id: 29,
      text: "息子が自分でSafariのAIに「分数の足し算の問題出して」と頼んで宿題してる姿を見てびっくり。親が教えてないのに自然にAI活用してる未来を感じた",
      effect: { type: "move", value: 3 }
    },
    {
      id: 30,
      text: "週末に娘とレストランでたわいもない雑談。「お腹すいた」の言葉に可愛い返しが返ってきて、家族の何気ない時間が心の充電になる",
      effect: { type: "move", value: 2 }
    },
    {
      id: 31,
      text: "忘年会で席替えアプリのバズりを仲間と共有しながら乾杯。リアルな繋がりと数字の喜びが重なって、最高の週末の締めくくり",
      effect: { type: "move", value: 3 }
    },
    {
      id: 32,
      text: "日曜最終日のソファで「明日から仕事か…」と思いながらも、不安を冷静に見つめ直したら意外と大したことないと気づき、心が軽くなった",
      effect: { type: "move", value: 2 }
    },
    {
      id: 33,
      text: "週末に新しいAIブラウザ「Atlas」を試す予定が決まり、やりたいことが多すぎてワクワク。休日の学び時間が楽しみで仕方ない",
      effect: { type: "move", value: 3 }
    },
    {
      id: 34,
      text: "娘の保育所発表会に参加して、クオリティの高さに感動。保育士さんの努力に感謝しつつ、家族の成長を実感する温かい週末",
      effect: { type: "move", value: 2 }
    },
    {
      id: 35,
      text: "週末にゆるキャラAIメーカーで遊んでみたらめっちゃ可愛いのができて大満足。休日の息抜きが創作意欲を刺激",
      effect: { type: "move", value: 3 }
    },
    {
      id: 36,
      text: "通勤Voicyで2025年の聴取データを振り返ったら、毎日聞いてた自分に感慨。日常の学び習慣が自信につながった",
      effect: { type: "move", value: 2 }
    },
    {
      id: 37,
      text: "週末に息子に自作の約分アプリを試させて一気に理解できた姿を見て達成感。家族が一番のテスターになる喜び",
      effect: { type: "move", value: 3 }
    },
    {
      id: 38,
      text: "日曜夜に「楽しい忙しさ」と「辛い忙しさ」の違いをnoteにまとめたら共感多数。週末の振り返りが自分の働き方を変えるきっかけに",
      effect: { type: "move", value: 3 }
    },
    {
      id: 39,
      text: "週末の公園タイムをポストしたら「わかる!」の反応多数。共働きの日常を共有することで繋がりが増えた",
      effect: { type: "move", value: 2 }
    },
    {
      id: 40,
      text: "週末にNotebookLMの新機能を触りまくり、来週の授業アイデアが爆誕。休日のインプットが仕事の質を上げてくれる",
      effect: { type: "move", value: 3 }
    },
    {
      id: 41,
      text: "子どものバスケクラブ運営がデジタル化でスムーズに",
      effect: { type: "move", value: 1 }
    },
    {
      id: 42,
      text: "通勤30分のVoicy学習で新しいAI活用法を思いついた",
      effect: { type: "move", value: 1 }
    },
    {
      id: 43,
      text: "週末の個人開発思想を教育実践に当てはめてnoteにまとめ、共感の声が続々。自分が幸せ起点で周りも幸せになる好循環を実感",
      effect: { type: "move", value: 4 }
    },
    {
      id: 44,
      text: "娘の可愛い一言に癒され、週末の何気ない雑談が創作の源泉に。家族との時間がアイデアを豊かにする",
      effect: { type: "move", value: 3 }
    },
    {
      id: 45,
      text: "週末に環境デザイン実践(縄跳びホール風)を思い浮かべ、来週の教室レイアウトが変わりそう。休日の気づきが授業を変える",
      effect: { type: "move", value: 3 }
    },
    {
      id: 46,
      text: "日曜夜の割り切りマインドで週末を有効活用でき、新しいツールのベータテストが進む。余白が学びを生む",
      effect: { type: "move", value: 2 }
    },
    {
      id: 47,
      text: "忘年会バズりで週末が最高の締めくくり。リアルとオンラインの喜びが重なってモチベーション爆上がり",
      effect: { type: "move", value: 4 }
    },
    {
      id: 48,
      text: "GASアプリがGoogle公式事例として紹介された",
      effect: { type: "move", value: 4 }
    },
    {
      id: 49,
      text: "音声入力機能で職員の会議記録が劇的に楽に",
      effect: { type: "move", value: 2 }
    },
    {
      id: 50,
      text: "「絵が描けなくても漫画が作れる」ワークショップ大盛況",
      effect: { type: "move", value: 3 }
    },
    {
      id: 51,
      text: "学校のデジタル化事例が教育雑誌に掲載",
      effect: { type: "move", value: 3 }
    },
    {
      id: 52,
      text: "朝の通勤学習で得た知識を即日授業で実践",
      effect: { type: "move", value: 2 }
    },
    {
      id: 53,
      text: "フォロワーから「人生変わりました」とメッセージが来た",
      effect: { type: "move", value: 3 }
    },
    {
      id: 54,
      text: "作ったツールが他の自治体の標準ツールに採用",
      effect: { type: "move", value: 5 }
    },
    {
      id: 55,
      text: "伝統的な学校文化を変革する「Culture Hacker」として書籍化オファー!",
      effect: { type: "move", value: 6 }
    }
  ],

  // ネガティブイベント: 仕事・開発 (10個)
  negative: [
    {
      id: 1,
      text: "新しいChrome拡張のバグ修正に徹夜…",
      effect: { type: "move", value: -2 }
    },
    {
      id: 2,
      text: "AIが生成した漫画の著作権問題で炎上気味",
      effect: { type: "move", value: -3 }
    },
    {
      id: 3,
      text: "iPad大量アップデートで1日潰れた",
      effect: { type: "move", value: -2 }
    },
    {
      id: 4,
      text: "Gemini APIの使用制限に引っかかって作業ストップ",
      effect: { type: "move", value: -2 }
    },
    {
      id: 5,
      text: "「AIに頼りすぎ」と保守派の先生から批判",
      effect: { type: "move", value: -1 }
    },
    {
      id: 6,
      text: "深夜のコーディングで寝不足、授業で居眠りしそうに",
      effect: { type: "move", value: -1 }
    },
    {
      id: 7,
      text: "無料配布ツールのサポート問い合わせが殺到して対応しきれない",
      effect: { type: "move", value: -2 }
    },
    {
      id: 8,
      text: "YAMLテンプレートの構文エラーで半日溶けた",
      effect: { type: "move", value: -2 }
    },
    {
      id: 9,
      text: "学校Wi-Fiダウンでデジタル化計画が全停止",
      effect: { type: "move", value: -3 }
    },
    {
      id: 10,
      text: "SNSで情報発信しすぎて「仕事してるの?」と言われる",
      effect: { type: "move", value: -1 }
    },
    // ネガティブイベント: 家族・生活バランス (5個)
    {
      id: 11,
      text: "週末の公園開発タイムがアプリのバグ修正に溶けてしまい、コーヒーが冷めてしまった。家族時間優先のつもりが…",
      effect: { type: "move", value: -2 }
    },
    {
      id: 12,
      text: "日曜夜の憂鬱が強すぎて、月曜朝まで引きずり週初めから疲弊スタート。割り切ろうとしても不安が増幅",
      effect: { type: "move", value: -2 }
    },
    {
      id: 13,
      text: "息子がAI宿題に頼りすぎて「自分で考えてる?」と心配に。便利さと学びの深さのバランスが難しい",
      effect: { type: "move", value: -1 }
    },
    {
      id: 14,
      text: "週末に新しいツール試そうとしたら設定でつまずき、時間だけが過ぎる。ワクワクがイライラに変わってしまった",
      effect: { type: "move", value: -2 }
    },
    {
      id: 15,
      text: "家族との週末夕食がアプリ開発に熱中しすぎて遅れ、妻に指摘されて反省。幸せ起点がズレてしまった",
      effect: { type: "move", value: -1 }
    }
  ],

  // ニュートラルイベント: 中立・選択 (10個)
  neutral: [
    {
      id: 1,
      text: "新しいAIツールを試すか、今のツールを磨き込むか?(サイコロで決定)",
      effect: {
        type: "dice",
        conditions: {
          even: { type: "move", value: 2, message: "偶数!新ツールが大当たり!" },
          odd: { type: "move", value: -1, message: "奇数!時間を使いすぎた…" }
        }
      }
    },
    {
      id: 2,
      text: "休日に勉強会参加 vs 家族時間を優先?",
      effect: {
        type: "choice",
        options: [
          { label: "勉強会参加", effect: { type: "move", value: 3 }, message: "新しい知識を獲得!" },
          { label: "家族時間", effect: { type: "move", value: 2 }, message: "心の充電完了!" }
        ]
      }
    },
    {
      id: 3,
      text: "バズるコンテンツ作りに挑戦!(サイコロ6で成功)",
      effect: {
        type: "dice",
        conditions: {
          six: { type: "move", value: 4, message: "6が出た!バズった!" },
          other: { type: "move", value: -1, message: "残念!時間だけが過ぎた…" }
        }
      }
    },
    {
      id: 4,
      text: "大型プロジェクト開始!じっくり取り組む?",
      effect: {
        type: "choice",
        options: [
          { label: "じっくり取り組む", effect: { type: "move", value: 3 }, message: "完成!大きな成果!" },
          { label: "スキップ", effect: { type: "move", value: 0 }, message: "今回は見送り" }
        ]
      }
    },
    {
      id: 5,
      text: "新機能のベータテスト募集があった!(リスキー)",
      effect: {
        type: "dice",
        conditions: {
          even: { type: "move", value: 3, message: "偶数!成功して評価アップ!" },
          odd: { type: "move", value: -2, message: "奇数!バグで苦労した…" }
        }
      }
    },
    {
      id: 6,
      text: "週末に公園で家族時間 vs 新しいアプリ開発に没頭?",
      effect: {
        type: "choice",
        options: [
          { label: "家族時間", effect: { type: "move", value: 2 }, message: "心の余白回復!" },
          { label: "アプリ開発", effect: { type: "move", value: 3 }, message: "創作倍速で進んだ!" }
        ]
      }
    },
    {
      id: 7,
      text: "日曜夜の憂鬱をVoicyで解消するか、早めに寝るか?",
      effect: {
        type: "dice",
        conditions: {
          even: { type: "move", value: 3, message: "偶数!リフレッシュ成功!" },
          odd: { type: "move", value: -1, message: "奇数!憂鬱を持ち越した…" }
        }
      }
    },
    {
      id: 8,
      text: "週末に息子・娘の宿題観察 vs 自分のツール開発?",
      effect: {
        type: "choice",
        options: [
          { label: "宿題観察", effect: { type: "move", value: 2 }, message: "家族の気づきを得た!" },
          { label: "ツール開発", effect: { type: "move", value: 4 }, message: "新機能完成!" }
        ]
      }
    },
    {
      id: 9,
      text: "通勤Voicyを「新しいAI学習」に使うか「リラックス音楽」に?",
      effect: {
        type: "choice",
        options: [
          { label: "AI学習", effect: { type: "move", value: 3 }, message: "アイデア爆発!" },
          { label: "リラックス", effect: { type: "move", value: 1 }, message: "疲労回復で安定" }
        ]
      }
    },
    {
      id: 10,
      text: "週末最終日にnote記事を書くか、のんびり家族時間?(サイコロ6で決定)",
      effect: {
        type: "dice",
        conditions: {
          six: { type: "move", value: 4, message: "6が出た!共感バズ!" },
          other: { type: "move", value: -1, message: "時間が溶けた…" }
        }
      }
    }
  ],

  // スペシャルイベント: ゲームを盛り上げる特殊効果 (10個)
  special: [
    {
      id: 1,
      text: "🎁 ボーナスチャンス！もう一度サイコロを振れるよ！",
      effect: { type: "bonus", value: 1 }
    },
    {
      id: 2,
      text: "🌟 ワープゾーン発動！5マス前進！",
      effect: { type: "move", value: 5 }
    },
    {
      id: 3,
      text: "🔄 位置交換イベント！一番進んでいるプレイヤーと位置を交換！",
      effect: { type: "swap", target: "first" }
    },
    {
      id: 4,
      text: "⚡ スピードアップ！次のターン、サイコロの目が2倍になる！",
      effect: { type: "double_next", value: 1 }
    },
    {
      id: 5,
      text: "🎪 大逆転チャンス！サイコロを2回振って、好きな方を選べる！",
      effect: { type: "choice_dice", rolls: 2 }
    },
    {
      id: 6,
      text: "🎯 ワープ選択！スタートに戻るか、10マス進むか選べる！",
      effect: {
        type: "choice",
        options: [
          { label: "スタートに戻る", effect: { type: "warp", value: 0 }, message: "スタートに戻った！" },
          { label: "10マス進む", effect: { type: "move", value: 10 }, message: "10マス前進！" }
        ]
      }
    },
    {
      id: 7,
      text: "🌈 ラッキーゾーン！次の3ターン、ネガティブイベントを無効化！",
      effect: { type: "shield", turns: 3 }
    },
    {
      id: 8,
      text: "🎲 運試し！サイコロで4以上なら15マス進む、3以下なら5マス戻る！",
      effect: {
        type: "dice",
        conditions: {
          high: { type: "move", value: 15, message: "4以上！大成功！" },
          low: { type: "move", value: -5, message: "3以下...残念！" }
        }
      }
    },
    {
      id: 9,
      text: "🚀 ロケットスタート！ゴールまでの距離の半分まで進める！",
      effect: { type: "warp", value: "half" }
    },
    {
      id: 10,
      text: "💫 全員ボーナス！全プレイヤーが3マス進む！（自分は5マス）",
      effect: { type: "all_move", self: 5, others: 3 }
    }
  ]
};
