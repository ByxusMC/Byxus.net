<template>
	<b-modal class="edit-comment" :id="`edit-comment-${index}-${comment.id}`">
		<template v-slot:modal-title>Edition du commentaire</template>
		<div class="my-2">
			<div class="form-group">
				<label for="">Commentaire</label>
				<client-only>
					<editor
						ref="editor"
						:options="editorOptions"
						:initialValue="comment.message"
						initialEditType="wysiwyg"
						mode="wysiwyg"
						@change="onEditorChange"
					/>
				</client-only>
			</div>
		</div>
		<template v-slot:modal-footer>
			<div class="w-100">
				<b-button
					variant="primary"
					size="sm"
					class="float-right"
					@click.prevent="handleSubmit"
					>Valider</b-button
				>
			</div>
		</template>
	</b-modal>
</template>

<script>
export default {
	name: 'CommentsModalUpdate',
	props: ['comment', 'index'],
	data() {
		return {
			editorOptions: {
				minHeight: '200px',
				language: 'de-FR',
				useCommandShortcut: true,
				useDefaultHTMLSanitizer: true,
				usageStatistics: false,
				hideModeSwitch: false,
				hideModeSwitch: true,
				toolbarItems: [
					'heading',
					'bold',
					'italic',
					'strike',
					'hr',
					'quote',
					'ul',
					'ol',
					'task',
					'indent',
					'outdent',
					'divider',
					'table',
					'image',
					'link',
					'code',
					'codeblock',
				],
			},
		}
	},
	methods: {
		async onEditorChange() {
			this.comment.message = this.$refs.editor.invoke('getMarkdown')
		},
		handleSubmit() {
			this.$emit('onCreate', this.comment)
		},
	},
}
</script>

<style lang="scss" scoped></style>
