<template>
  <!-- 使用方式：
    <QuizQuestion
      prompt="如果您想使用机器学习模型来预测商业建筑的能耗，您会使用哪种类型的模型？"
      :options="[
        { label: '分类', description: '分类模型可预测某事物是否属于某个类别，而回归模型可预测数值。由于能耗以千瓦时 (kWh) 为单位进行衡量，是一个数值，因此您需要使用回归模型。' },
        { label: '回归', description: '能耗以千瓦时 (kWh) 为单位，是一个数值，因此您需要使用回归模型。' }
      ]"
      :correct-index="1"
      submit-text="提交答案"
      reset-text="再试一次"
      success-label="正确答案"
      failure-label="请重试"
    />
  -->
  <div class="quiz-card">
    <div class="quiz-card__prompt">
      <div class="quiz-card__prompt-text">{{ promptText }}</div>
    </div>

    <div class="quiz-card__options">
      <button
        v-for="(option, index) in normalizedOptions"
        :key="index"
        type="button"
        class="quiz-card__option"
        :class="{
          selected: selected === index,
          correct: reveal && selected === index && selected === resolvedCorrectIndex,
          wrong: reveal && selected === index && selected !== resolvedCorrectIndex,
        }"
        @click="select(index)"
      >
        <div class="quiz-card__option-header">
          <span class="quiz-card__option-title">{{ option.label }}</span>
          <span
            v-if="reveal && selected === index"
            class="quiz-card__option-icon"
            :class="{ correct: selected === resolvedCorrectIndex, incorrect: selected !== resolvedCorrectIndex }"
          >
            <svg
              v-if="selected === resolvedCorrectIndex"
              class="quiz-card__icon-svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 12.5l4.2 4.2L19 7" />
            </svg>
            <svg v-else class="quiz-card__icon-svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 7l10 10M17 7L7 17" />
            </svg>
          </span>
        </div>

        <div v-if="reveal && option.description" class="quiz-card__option-description">{{ option.description }}</div>

        <div
          v-if="reveal"
          class="quiz-card__option-status"
          :class="{ correct: selected === index && selected === resolvedCorrectIndex, incorrect: selected === index && selected !== resolvedCorrectIndex }"
        >
          {{ selected === index ? (selected === resolvedCorrectIndex ? props.successLabel : props.failureLabel) : '' }}
        </div>
      </button>
    </div>

    <div class="quiz-card__actions">
      <button
        class="quiz-card__submit"
        type="button"
        @click="submit"
        :disabled="selected === null || resolvedCorrectIndex === null"
      >
        {{ props.submitText }}
      </button>
      <button v-if="reveal" class="quiz-card__reset" type="button" @click="reset">
        {{ props.resetText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// QuizQuestion 组件外部属性说明：
// - prompt: 顶部题干文本
// - question: 兼容旧调用，等价于 prompt
// - options: 候选答案列表，接收 { label, description } 对象数组
// - correctIndex: 正确选项索引（从 0 开始）
// - submitText: 提交按钮文本
// - resetText: 重试按钮文本
// - successLabel: 正确项状态文本
// - failureLabel: 错误项状态文本
const props = defineProps({
  prompt: {
    type: String,
    default: '',
  },
  question: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  correctIndex: {
    type: [Number, String],
    default: null,
  },
  submitText: {
    type: String,
    default: '提交答案',
  },
  resetText: {
    type: String,
    default: '再试一次',
  },
  successLabel: {
    type: String,
    default: '正确答案',
  },
  failureLabel: {
    type: String,
    default: '请重试',
  },
})

const selected = ref(null)
const reveal = ref(false)

const promptText = computed(() => props.prompt || props.question)

const normalizedOptions = computed(() =>
  props.options.map(item => {
    if (typeof item === 'string') {
      return { label: item, description: '' }
    }
    return {
      label: item?.label ?? '',
      description: item?.description ?? '',
    }
  })
)

const resolvedCorrectIndex = computed(() => {
  return props.correctIndex === null ? null : Number(props.correctIndex)
})

function select(index) {
  if (reveal.value) return
  selected.value = index
}

function submit() {
  if (selected.value === null) return
  reveal.value = true
}

function reset() {
  selected.value = null
  reveal.value = false
}
</script>

<style scoped>
.quiz-card {
  border: 1px solid var(--vp-c-divider, #e7eaf3);
  border-radius: 18px;
  overflow: hidden;
  background: var(--vp-c-bg-alt, #ffffff);
  box-shadow: var(--vp-shadow-3, 0 12px 32px rgba(38, 78, 164, 0.08));
  max-width: 760px;
  margin-bottom: 32px;
}

.quiz-card__prompt {
  background: var(--vp-c-bg-soft, #fafbff);
  padding: 18px 20px;
  border-bottom: 1px solid var(--vp-c-border, #dbe2ef);
}

.quiz-card__prompt-text {
  color: var(--vp-c-text-1, #1f2d52);
  line-height: 1.75;
}

.quiz-card__options {
  display: grid;
  gap: 12px;
  padding: 20px;
}

.quiz-card__option {
  display: block;
  width: 100%;
  text-align: left;
  border: 1px solid var(--vp-c-border, #dbe2ef);
  border-radius: 14px;
  background: var(--vp-c-bg-soft, #fafbff);
  color: var(--vp-c-text-1, #1f2d52);
  padding: 18px;
  cursor: pointer;
  transition: border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;
}

.quiz-card__option:hover {
  border-color: var(--vp-c-brand-2, #8d9eff);
  box-shadow: 0 0 0 1px rgba(79, 103, 243, 0.08);
}

.quiz-card__option.selected {
  border-color: var(--vp-c-brand-1, #5565f6);
}

.quiz-card__option.correct {
  border-color: var(--vp-c-success-1, #2b8a3e);
  background: var(--vp-c-success-soft, #e8f5ea);
}

.quiz-card__option.wrong {
  border-color: var(--vp-c-danger-1, #cb2431);
  background: var(--vp-c-danger-soft, #fbe8ea);
}

.quiz-card__option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.quiz-card__option-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1, #1f2d52);
}

.quiz-card__option-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-danger-1, #cb2431);
  color: var(--vp-c-danger-1, #cb2431);
  background: var(--vp-c-danger-soft, #fbe8ea);
}

.quiz-card__option-icon.correct {
  border-color: var(--vp-c-success-1, #2b8a3e);
  color: var(--vp-c-success-1, #2b8a3e);
  background: var(--vp-c-success-soft, #e8f5ea);
}

.quiz-card__icon-svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.quiz-card__option-description {
  color: var(--vp-c-text-2, #4e5d7a);
  line-height: 1.8;
  margin-bottom: 12px;
}

.quiz-card__option-status {
  font-weight: 600;
  color: var(--vp-c-text-2, #4e5d7a);
}

.quiz-card__option-status.correct {
  color: var(--vp-c-success-1, #2b8a3e);
}

.quiz-card__option-status.incorrect {
  color: var(--vp-c-danger-1, #cb2431);
}

.quiz-card__actions {
  display: flex;
  gap: 12px;
  padding: 0 20px 20px;
}

.quiz-card__submit,
.quiz-card__reset {
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: 600;
}

.quiz-card__submit {
  background: var(--vp-button-brand-bg, #3b5bdb);
  color: var(--vp-button-brand-text, #ffffff);
  border: 1px solid transparent;
}

.quiz-card__submit:hover:not(:disabled) {
  background: var(--vp-button-brand-hover-bg, #3553c7);
}

.quiz-card__submit:active:not(:disabled) {
  background: var(--vp-button-brand-active-bg, #2f49b0);
}

.quiz-card__submit:disabled {
  background: var(--vp-c-default-soft, #cfd4df);
  color: var(--vp-c-text-3, #6b7280);
  border-color: var(--vp-c-divider, #c5cad3);
  opacity: 1;
  cursor: not-allowed;
}

.quiz-card__reset {
  background: var(--vp-c-bg-soft, #f4f7ff);
  color: var(--vp-c-text-2, #324069);
}
</style>
