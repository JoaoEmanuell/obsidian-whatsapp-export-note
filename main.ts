import { addIcon, Notice, Plugin, TFile } from "obsidian";
import { whatsAppIcon } from "./assets/whatsapp";
import { convertNote } from "src/convertNote";

export default class WhatsappExportNotePlugin extends Plugin {
	async onload() {
		// add whatsApp icon
		addIcon("whatsapp", whatsAppIcon);

		this.addRibbonIcon("whatsapp", "Exportar nota", async () => {
			await this.exportNote();
		});

		this.addCommand({
			id: "whatsapp-export-note-export",
			name: "Exportar nota",
			callback: async () => {
				await this.exportNote();
			},
		});
	}

	onunload() {}

	async exportNote() {
		new Notice("Exportar nota");
		const noteFile = this.app.workspace.getActiveFile();
		if (!noteFile) {
			new Notice("Abra uma nota para que ela possa ser exportada!");
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
			"Nota exportada com sucesso, copie o conteúdo dela e envie para o whatsapp"
		);
	}
}
