import { Icon } from '@iconify/vue';
import { h } from 'vue';

export default function (iconName) {
	return h(
		Icon,
		{ icon: iconName },
		{
			default: () => iconName,
		}
	);
}