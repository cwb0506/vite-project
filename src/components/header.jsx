import { defineComponent, h } from 'vue'
export default defineComponent({
  props: {
    level: {
			type: String,
			default: '1'
		}
  },
	setup(props, { slots }) {
		const tag = 'h' + props.level
		return () => <tag>{ slots.default() }</tag>
		// return () => h(
		// 	'h' + props.level, // 标签名
		// 	{}, // prop或者attribute
		// 	slots.default() // 子节点
		// )
	}
})