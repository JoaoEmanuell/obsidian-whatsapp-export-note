import { addIcon, Notice, Plugin } from "obsidian";
import { whatsAppIcon } from "./assets/whatsapp";
import { convertNote } from "src/convertNote";

export default class WhatsappExportNotePlugin extends Plugin {
	async onload() {
		// add whatsApp icon
		addIcon("whatsapp", whatsAppIcon);

		this.addRibbonIcon("whatsapp", "Export note", async () => {
			await this.exportNote();
		});

		this.addCommand({
			id: "export-note",
			name: "Export note",
			callback: async () => {
				await this.exportNote();
			},
		});
	}

	onunload() {}

	async exportNote() {
		new Notice("Export note");
		const noteFile = this.app.workspace.getActiveFile();
		if (!noteFile) {
			new Notice("Open a note so it can be exported!");
			return;
		}
		const text = await this.app.vault.read(noteFile);
		const converted = convertNote(text);
		const directory = noteFile.path.split("/").slice(0, -1).join("/");
		const date = new Date();
		const fullPathForNewNote = `${directory}/${noteFile.name.replaceAll(
			".md",
			""
		)}-whatsapp-${date.toISOString().replaceAll(":", "_")}.md`;
		await this.app.vault.create(fullPathForNewNote, converted);
		new Notice(
			"Note exported successfully, copy its content and send it to WhatsApp"
		);
	}
}
