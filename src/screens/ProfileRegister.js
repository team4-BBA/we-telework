import React, { useLayoutEffect, useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import * as d3 from 'd3'
import useWindowDimensions from '../hooks/WindowSize'
import { fakeData } from '../constants/fakeData'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import { AuthContext } from '../hooks/contexts/AuthContext'
/* eslint react-hooks/exhaustive-deps:0 */
// export interface ProfileRegisterProps {}
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.timeout = 10000
const ProfileRegister = () => {
  // const [next, setNext] = useState([])
  const { user, setHotels } = useContext(AuthContext)
  const [words, setWords] = useState('')
  const [turns, setTurns] = useState(1)
  const [sending, setSending] = useState(false)
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState('')
  const [isLoading, setLoading] = useState(false)
  const { width, height } = useWindowDimensions()

  const history = useHistory()

  useLayoutEffect(() => init(fakeData), [])

  useEffect(() => {
    const colors = Array.from(d3.selectAll('g')._groups[0]).map((i) => i.children[1].style.fill)
    setCount(colors.filter((i) => i === 'red').length)
  }, [flag])

  var toggleSelect = (function () {
    var currentColor
    return function () {
      currentColor = d3.select(this)._groups[0][0].style.fill === 'black' ? 'red' : 'black'
      // console.log(d3.select(this)._groups[0][0].style.fill)
      d3.select(this).style('fill', currentColor)
      setFlag(Math.random())
    }
  })()

  const getSynonyms = async (selectedWords) => {
    let words = []
    const get = async (word) => {
      console.log(`http://wordassociator.ap.mextractr.net/word_associator/api_query?query=${word}`)
      await axios
        .get(`https://yumyumyum.info/synonyms?query=${word}`)
        .then((res) => {
          console.log(...JSON.parse(res.data.result))
          words.push(...JSON.parse(res.data.result))
        })
        .catch((error) => {
          // alert('err occurred')
          console.error(error)
        })
    }
    await Promise.all(selectedWords.map(async (item) => await get(item)))
    return words // new set of words of bubbles
  }

  const handleNext = () => {
    setLoading(true)
    setTurns(turns + 1)
    if (turns > 1) {
      // alert('サーバーに文字列を送信するで')
      console.log(words)
      setLoading(false)
      setSending(true)
      getReccommend()
      return
    }
    const selectedWords = Array.from(d3.selectAll('g')._groups[0])
      .map((i) => i)
      .filter((i) => i.children[1].style.fill === 'red')
      .map((i) => i.children[0].textContent)

    getSynonyms(selectedWords).then((data) => {
      console.log(words)
      setWords(words + data.map((i) => i[0]).join(''))
      const nextData = data.slice(0, 30).map((i) => ({ x: 800 * Math.random(), y: 600 * Math.random(), r: 35, text: i[0] }))
      reset().then(() => {
        init(nextData)
        setLoading(false)
      })
    })
  }

  const reset = async () => {
    await d3.selectAll('g').remove()
  }

  const getReccommend = () => {
    console.log(user.uid)
    // getしてみるのは省略
    // 登録しにいく
    var bodyFormData = new URLSearchParams()
    bodyFormData.append('userId', user.uid)
    bodyFormData.append('words', words)
    axios
      .post('https://yumyumyum.info/post-pref', bodyFormData)
      .then((res) => {
        console.log(JSON.parse(res.data).message)
        if (JSON.parse(res.data).message === 'created') {
          setTimeout(() => {
            axios
              .get('https://yumyumyum.info/get-pref', {
                params: {
                  userId: user.uid
                }
              })
              .then((res) => {
                console.log(res.data)
                setHotels(JSON.stringify(res.data))
                history.push('/result')
              })
              .catch((e) => {
                console.error(e)
              })
          }, 2000)
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const init = (data) => {
    let nodesData = data
    // d3.select('svg').append('text').attr('class', 'title').attr('x', 10).attr('y', 30).text('気に入った単語を3つ以上選ぼう')

    // svg要素を配置
    // callでドラッグ時のイベント関数を登録
    var nodeGroup = d3
      .select('svg')
      .selectAll('g')
      .data(nodesData)
      .enter()
      .append('g')
      .call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))

    //gの子要素としてcircleをappend
    nodeGroup
      .append('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', (d) => d.r)
      .style('fill', 'transparent')
      .style('cursor', 'pointer')
      .append('title')
      .text((d) => d.text)

    //gの子要素としてtextをappend
    nodeGroup
      .append('text')
      .on('click', toggleSelect)
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('fill', 'black')
      .style('cursor', 'pointer')
      .text((d) => d.text)
      .append('title')
      .text((d) => d.text)

    // forceSimulation設定
    var simulation = d3
      .forceSimulation()
      .force(
        'collide',
        d3
          .forceCollide()
          .radius((d) => d.r)
          .strength(1)
          .iterations(1)
      )
      .force('charge', d3.forceManyBody().strength(100))
      .force(
        'x',
        d3
          .forceX()
          .strength(0.03)
          .x(width / 2)
      )
      .force(
        'y',
        d3
          .forceY()
          .strength(0.015)
          .y((height * 0.6) / 2)
      )
    //radius => ノードの半径、defaultは1
    //strength => どのくらいで戻るかの係数、0.0～1.0が推奨

    simulation.nodes(nodesData).on('tick', ticked)

    // forceSimulation 描画更新用関数
    function ticked() {
      nodeGroup
        .select('circle')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
      nodeGroup
        .select('text')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
    }

    // ドラッグ時のイベント関数
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }
    //alphaTarget => シミュレーションを滑らかに繋げるための係数、0～1を指定できる。低いほうが滑らか

    function dragged(d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }
  }

  if (sending) {
    return (
      <div style={{ width: '95%', margin: '0 auto' }}>
        <div style={{ height: '40vh' }}></div>
        <div style={{ textAlign: 'center' }}>おすすめ分析中</div>
        <div style={{ textAlign: 'center', height: '5em' }}>
          <CircularProgress />
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', width: '95%', margin: '0 auto' }}>
      <p>気に入った単語を3つ以上選ぼう！</p>
      <div className="spacer1"></div>
      <p style={{ textAlign: 'center' }}>{turns}/3回目 </p>

      <div style={{ border: '3px solid grey', borderRadius: '15px', height: '60vh' }}>
        <svg className="test" height="100%" width="100%" />
      </div>
      <div className="spacer1"></div>
      {isLoading && (
        <div style={{ textAlign: 'right' }}>
          <CircularProgress />
        </div>
      )}
      <div>{count}個選択中</div>
      <div style={{ textAlign: 'right' }}>
        <Button variant="contained" color="primary" disabled={count < 1} onClick={handleNext}>
          次へ
        </Button>
        {/* <Button variant="contained" color="primary" disabled={count < 3} onClick={() => history.push('/detail/1037')}>
          次へ
        </Button> */}
        {/* 「次へ」の方のボタンは、AIが本当におすすめしてくれるときは、消してください。
        　　　3回目の選択後に偽画面へ送る処理が完成した時も、消してください。 */}
      </div>
      {/* <button onClick={() => console.log(words)}>words</button>
      <button onClick={() => console.log(count)}>count</button>
      <button onClick={() => setCount(count + 1)}>count++</button> */}
    </div>
  )
}

export default ProfileRegister
