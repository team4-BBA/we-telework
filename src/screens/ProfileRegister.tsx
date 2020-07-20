import React, { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import * as d3 from 'd3'

export interface ProfileRegisterProps {}

const ProfileRegister: React.SFC<ProfileRegisterProps> = () => {
  let node: any
  let simulation: any

  useLayoutEffect(() => {
    init()
  }, [])

  const init = () => {
    const test = d3.select('.test')
    test.append('div').html('Hello D3')
    var nodesData = []
    for (var i = 0; i < 50; i++) {
      nodesData.push({
        x: 800 * Math.random(),
        y: 600 * Math.random(),
        r: 30 * Math.random() + 5
      })
    }

    // 2. svg要素を配置
    node = d3
      .select('svg')
      .selectAll('circle')
      .data(nodesData)
      .enter()
      .append('circle')
      .attr('r', (d: any) => d.r)
      .attr('fill', 'LightSalmon')
      .attr('stroke', 'black')
      .call(
        d3.drag()
        // .on('start', dragstarted)
        // .on('drag', dragged)
        // .on('end', dragended)
      )

    // 3. forceSimulation設定
    simulation = d3
      .forceSimulation()
      // .force("link", d3.forceLink()) // 今回は不使用
      .force(
        'collide',
        d3
          .forceCollide()
          .radius(function (d: any) {
            return d.r
          })
          .strength(1.0)
          .iterations(16)
      )
      .force('charge', d3.forceManyBody().strength(5))
      .force('x', d3.forceX().strength(0.1).x(400))
      .force('y', d3.forceY().strength(0.1).y(300))
    // .force("center", d3.forceCenter(300, 200)); // 今回は不使用

    simulation.nodes(nodesData).on('tick', ticked)
  }

  // 4. forceSimulation 描画更新用関数
  function ticked() {
    node
      .attr('cx', function (d: any) {
        return d.x
      })
      .attr('cy', function (d: any) {
        return d.y
      })
  }

  // 5. ドラッグ時のイベント関数
  function dragstarted(d: any) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
  }

  function dragged(d: any) {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  function dragended(d: any) {
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
