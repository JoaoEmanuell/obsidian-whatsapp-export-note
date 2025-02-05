import { addIcon, Notice, Plugin, TFile } from "obsidian";
import { whatsAppIcon } from "./assets/whatsapp";
import { convertNote } from "src/convertNote";

export default class WhatsappExportNotePlugin extends Plugin {
	async onload() {
		// add whatsApp icon
		addIcon("whatsapp", whatsAppIcon);

		this.addRibbonIcon("whatsapp", "Export note", async () => {
			const currentNote = this.getCurrentNote();
			if (currentNote) {
				this.exportNote(currentNote);
				return true;
			} else {
				new Notice("Open a note so it can be exported!");
				return false;
			}
		});

		this.addCommand({
			id: "export-note",
			name: "Export note",
			checkCallback: (checking: boolean) => {
				const currentNote = this.getCurrentNote();
				if (currentNote) {
					if (!checking) {
						this.exportNote(currentNote);
					}
					return true;
				} else {
					new Notice("Open a note so it can be exported!");
					return false;
				}
			},
		});
	}

	onunload() {}

	getCurrentNote() {
		const noteFile = this.app.workspace.getActiveFile();
		return noteFile;
	}

	async exportNote(currentNote: TFile) {
		new Notice("Export note");
		const text = await this.app.vault.read(currentNote);
		const converted = convertNote(text);
		const directory = currentNote.path.split("/").slice(0, -1).join("/");
		const date = new Date();
		const fullPathForNewNote = `${directory}/${currentNote.name.replaceAll(
			".md",
			""
		)}-whatsapp-${date.toISOString().replaceAll(":", "_")}.md`;
		await this.app.vault.create(fullPathForNewNote, converted);
		new Notice(
			"Note exported successfully, copy its content and send it to WhatsApp"
		);
	}
}
