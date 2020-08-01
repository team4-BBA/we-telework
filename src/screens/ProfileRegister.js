import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as d3 from 'd3'
import useWindowDimensions from '../hooks/WindowSize'
import { Balls, fakeData } from '../constants/fakeData'
/* eslint react-hooks/exhaustive-deps:0 */
// export interface ProfileRegisterProps {}

const ProfileRegister = () => {
  const [selectedWords, setSelectedWords] = useState([])
  const [words, setWords] = useState('')
  const [turns, setTurns] = useState(1)
  const [count, setCount] = useState(1)
  const [flag, setFlag] = useState('')
  const { width, height } = useWindowDimensions()

  useLayoutEffect(() => init(), [])

  useEffect(() => {
    const colors = Array.from(d3.selectAll('g')._groups[0]).map((i) => i.children[1].style.fill)
    setCount(colors.filter((i) => i === 'red').length)
  }, [flag])

  // const toggleSelect = (function () {
  //   let currentColor
  //   return function () {
  //     console.log(d3.select(this)._groups[0][0].style.fill)
  //     currentColor = d3.select(this)._groups[0][0].style.fill == 'black' ? 'red' : 'black'
  //     console.log(count, 'count')
  //     let newCount
  //     if (d3.select(this)._groups[0][0].style.fill == 'black') {
  //       console.log(count, '+1')
  //       newCount = count + 1
  //     } else {
  //       newCount = count - 1
  //       console.log(count, '-1')
  //     }
  //     console.log(count, count + 1, count + 2)
  //     console.log(newCount)
  //     setCount(newCount)
  //     d3.select(this).style('fill', currentColor)
  //     // console.log(Array.from(d3.selectAll('g')._groups[0]).map((item) => item.children[1].style.fill))
  //     // console.log(d3.selectAll('g')._groups[0][0].children[1].style.fill)
  //     // console.log(currentColor)
  //     // if(currentColor==='black'){
  //     // }else
  //     console.log(d3.select(this)._groups[0][0].children[0].textContent)
  //   }
  // })()
  var toggleSelect = (function () {
    var currentColor
    return function () {
      currentColor = d3.select(this)._groups[0][0].style.fill == 'black' ? 'red' : 'black'
      console.log(d3.select(this)._groups[0][0].style.fill)
      d3.select(this).style('fill', currentColor)
      setFlag(Math.random())
    }
  })()

  // function toggleSelect(i, j) {
  //   console.log(i, j)
  //   let currentColor
  //   currentColor = d3.select(i)._groups[0][0].style.fill == 'black' ? 'red' : 'black'
  //   console.log(d3.select(this)._groups[0][0].style.fill)
  //     if (d3.select(this)._groups[0][0].style.fill == 'black') {
  //       console.log(count, '+1')
  //       newCount = count + 1
  //     } else {
  //       newCount = count - 1
  //       console.log(count, '-1')
  //     }
  //     console.log(newCount)

  //   console.log(d3.select(i)._groups[0][0].style.fill)
  //   console.log(count, 'count')
  //   let newCount
  // }

  const init = () => {
    let nodesData = fakeData
    d3.select('svg').append('text').attr('class', 'title').attr('x', 10).attr('y', 30).text("Bubbles of customer's voice")

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
        d3.forceCollide().radius((d) => d.r)
      )
      .force('charge', d3.forceManyBody())
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
          .strength(0.03)
          .y(height / 2)
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

  return (
    <div style={{ height: '100%' }}>
      <p>完成を待て！</p>
      <div>{count}個選択中</div>
      <button onClick={() => console.log(count)}>count</button>
      <button onClick={() => setCount(count + 1)}>count++</button>
      <div style={{ border: '2px solid blue', height: '60vh' }}>
        <svg className="test" height="100%" width="100%"></svg>
      </div>
      <div>
        <Link to={`/profile/registered`}>
          <button disabled={count < 3}>登録</button>
        </Link>
      </div>
    </div>
  )
}

export default ProfileRegister