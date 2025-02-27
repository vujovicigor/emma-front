<script context='module'>
	import { writable } from 'svelte/store';

	const steps = writable([]);

	export function startTour(_steps) {
		steps.set(_steps);
	}
</script>

<script>
	import { crossfade, fly } from 'svelte/transition';

	let currentStepPos = 0;
	let stepOnStage = [];
	let promptPos = '';

	const promptTransition = { key: {}, duration: 300, y: -8 };
	const spotlightTransition = { key: {}, duration: 300 };

	$: { $steps; start(); }

	function start() {
		if(!$steps || !$steps.length) return;

		startStep(0);
	}

	function startStep(stepPos) {
		if(stepPos >= $steps.length || stepPos < 0) {
			reset();
			return;
		}

		currentStepPos = stepPos;

		const step = $steps[currentStepPos];
		if(step.element) {
			step.targetNode = document.querySelector(step.element);

			if(step.targetNode) {
				step.targetNode.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
			}
		}

		stepOnStage = [step];
	}

	function reset() {
		steps.set([]);
		currentStepPos = 0;
		stepOnStage = [];
	}

	function onNext() {
		startStep(++currentStepPos);
	}

	function onBack() {
		startStep(--currentStepPos);
	}

	function onSkip() {
		reset();
	}

	function tourAction(node, step) {
		const promptNode = node.querySelector('.tour-prompt');
		const spotlightNode = node.querySelector('.tour-spotlight');
		const arrowNode = node.querySelector('.tour-arrow');
		const bodyNode = node.querySelector('.tour-body');
		const promptStyle = promptNode.style;
		const spotlightStyle = spotlightNode.style;
		const arrowStyle = arrowNode.style;

		function getNum(str) {
			return parseInt(str) || 0;
		}

		function updatePos() {
			if(step.targetNode) {
				// set prompt position
				const promptRect = promptNode.getBoundingClientRect();
				const targetRect = step.targetNode.getBoundingClientRect();

				if(targetRect.bottom + promptRect.height + 5 < document.body.clientHeight) {
					promptStyle.top = `${targetRect.bottom}px`;
					promptStyle.bottom = '';
					promptPos = '';
				} else {
					promptStyle.bottom = `${document.body.clientHeight - targetRect.top}px`;
					promptStyle.top = '';
					promptPos = 'top';
				}

				if(targetRect.left + promptRect.width + 5 < document.body.clientWidth) {
					promptStyle.left = `${targetRect.left}px`;
					promptStyle.right = '';
					promptStyle.marginLeft = promptStyle.marginRight = '';
				} else {
					promptStyle.right = '0';
					promptStyle.left = '';
					promptStyle.marginLeft = promptStyle.marginRight = '5px';
				}

				// set arrow position
				const pStyle = getComputedStyle(promptNode);
				const aStyle = getComputedStyle(arrowNode);
				arrowStyle.left =
					targetRect.width / 2 + targetRect.left - getNum(pStyle.left) -
					getNum(pStyle.marginLeft) - getNum(aStyle.borderLeftWidth) + 'px';

				// set spotlight position
				spotlightStyle.top = `${targetRect.top}px`;
				spotlightStyle.left = `${targetRect.left}px`;
				spotlightStyle.width = `${targetRect.width}px`;
				spotlightStyle.height = `${targetRect.height}px`;
			} else {
				// set prompt to center
				const bodyRect = bodyNode.getBoundingClientRect();

				promptStyle.top = `${(document.body.clientHeight - bodyRect.height) / 2}px`;
				promptStyle.left = `${(document.body.clientWidth - bodyRect.width) / 2}px`;
				promptPos = 'center';

				// set spotlight to center
				spotlightStyle.top = `${document.body.clientHeight / 2}px`;
				spotlightStyle.left = `${document.body.clientWidth / 2}px`;
				spotlightStyle.width = '0';
				spotlightStyle.height = '0';
			}
		}

		updatePos();
		window.addEventListener('scroll', updatePos);
		window.addEventListener('resize', updatePos);

		return {
			destroy() {
				window.removeEventListener('scroll', updatePos);
				window.removeEventListener('resize', updatePos);
			}
		}
	}

	const [send, receive] = crossfade({ fallback: fly });
</script>

<style>
	.tour-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 999999;
	}

	.tour-spotlight {
		position: fixed;
		box-shadow: 0 0 0 calc(999vw + 999vh) rgba(0, 0, 0, .5);
	}

	.tour-prompt {
		position: fixed;
		min-width: 15em;
		max-width: 25em;
	}

	.tour-arrow {
		position: absolute;
		margin-top: .1em;
		border-style: solid;
		border-width: 0 .5em .5em .5em;
		border-color: #334 transparent;
	}

	.tour-body {
		margin-top: .6em;
		background: #334;
		color: #fff;
	}

	.tour-content {
		padding: .5em;
	}

	.tour-footer {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: .5em .25em;
	}

	.tour-footer-left {
		flex-grow: 1;
	}

	.tour-footer-left, .tour-footer-right {
		display: flex;
	}

	button {
		margin: 0 .25em;
	}

	.tour-prompt.tour-prompt-top {
		display: flex;
		flex-direction: column-reverse;
	}

	.tour-prompt.tour-prompt-top>.tour-arrow {
		border-width: .5em .5em 0 .5em;
		margin-top: 0;
		margin-bottom: .1em;
	}

	.tour-prompt.tour-prompt-top>.tour-body {
		margin-top: 0;
		margin-bottom: .6em;
	}

	.tour-prompt.tour-prompt-center>.tour-arrow {
		border-width: 0 .5em;
		margin-top: 0;
		margin-bottom: 0;
	}

	.tour-prompt.tour-prompt-center>.tour-body {
		margin-top: 0;
		margin-bottom: 0;
	}
</style>


{#if $steps.length}
	<div class='tour-backdrop'>
		{#each stepOnStage as step (step)}
			<div use:tourAction={step}>
				<div
					class='tour-spotlight'
					in:receive={spotlightTransition}
					out:send={spotlightTransition}
				></div>
				<div
					class='tour-prompt'
					class:tour-prompt-top={promptPos === 'top'}
					class:tour-prompt-center={promptPos === 'center'}
					in:receive={promptTransition}
					out:send={promptTransition}
				>
					<div class='tour-arrow'></div>
					<div class='tour-body'>
						<div class='tour-content'>{step.message}</div>
						<div class='tour-footer'>
							<div class='tour-footer-left'>
								{#if currentStepPos < $steps.length - 1}
									<button on:click={onSkip}>Skip</button>
								{/if}
							</div>
							<div class='tour-footer-right'>
								{#if currentStepPos !== 0}
									<button on:click={onBack}>Back</button>
								{/if}
								<button on:click={onNext}>{currentStepPos < $steps.length - 1 ? 'Next' : 'Done'}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}