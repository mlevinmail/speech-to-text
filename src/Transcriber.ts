type TranscriberOptions = {
    apiKey: string;
};

export class Transcriber {
    private apiKey: string;

    constructor({ apiKey }: TranscriberOptions) {
        this.apiKey = apiKey;
    }

    setApiKey(apiKey: string) {
        this.apiKey = apiKey;
    }

    async transcribeAudio(audioBlob: Blob): Promise<string> {
        console.log(this.apiKey);
        console.log(audioBlob);
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.mp3");
        formData.append("model", "whisper-1");

        try {
            const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.apiKey
                },
                body: formData
            });

            const data = await response.json();

            if (data && data.text) {
                return data.text;
            } else {    
                throw new Error('Failed to get a valid transcription from the OpenAI API.');
            }

        } catch (error) {
            console.error("Error transcribing audio:", error);
            throw error;
        }
    }
}
