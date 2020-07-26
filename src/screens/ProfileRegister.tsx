import React, { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import * as d3 from 'd3'
import useWindowDimensions from '../hooks/WindowSize'
import { Balls, fakeData } from '../constants/fakeData'
/* eslint react-hooks/exhaustive-deps:0 */
export interface ProfileRegisterProps {}

const ProfileRegister: React.SFC<ProfileRegisterProps> = () => {
  let node: any
  let simulation: any

  const { width, height } = useWindowDimensions()

  useLayoutEffect(() => init(), [])

  const init = () => {
    let nodesData: Balls[] = fakeData

    // 2. svg要素を配置
    node = d3
      .select('svg')
      .selectAll('circle')
      .data(nodesData)
      .enter()
      .append('circle')
      .attr('r', (d: Balls) => d.r)
      .attr('fill', 'gold')
      .attr('stroke', 'black')
      .call(d3.drag<SVGCircleElement, any>().on('start', dragstarted).on('drag', dragged).on('end', dragended))
      .on('click', (d) => console.log(d))
      .style('cursor', 'pointer')

    // 3. forceSimulation設定
    simulation = d3
      .forceSimulation()
      .force(
        'collide',
        d3
          .forceCollide()
          .radius((d: any) => d.r)
          .strength(1)
          .iterations(1)
      )
      .force('charge', d3.forceManyBody().strength(100))
      .force(
        'x',
        d3
          .forceX()
          .strength(0.015)
          .x(width / 2)
      )
      .force(
        'y',
        d3
          .forceY()
          .strength(0.015)
          .y((height * 0.6) / 2)
      )

    simulation.nodes(nodesData).on('tick', ticked)
  }

  function ticked() {
    node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
  }

  // 5. ドラッグ時のイベント関数
  const dragstarted = (d: any): any => {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  const dragged = (d: any) => {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  const dragended = (d: any) => {
    if (!d3.event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }

  return (
    <div style={{ height: '100%' }}>
      <p>完成を待て！</p>
      <div style={{ border: '2px solid blue', height: '60vh' }}>
        <svg className="test" height="100%" width="100%"></svg>
      </div>
      <p>
        <Link to={`/profile/registered`}>
          <button>登録</button>
        </Link>
      </p>
    </div>
  )
}

export default ProfileRegister
