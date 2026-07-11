import { useQuery } from '@tanstack/react-query';

export const animeList = [
    {
        anime: "Jujutsu kaisen",
        gifs: [
            "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGF3NTVxa2Q3b2Rvd3phZWloaHBndWtpaGt2NW42dDU3MmRpN21jcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Al9XitEIwGgLU9yMfS/giphy.gif",
            "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnhtcW4xOWttZnpzNGdjZzNlc2QwMHBsd281cHg2NG43ZnMxa3ZwMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MZ7yrimhG3DThJqHjl/giphy.gif"
        ]
    },
    {
        anime: "Dragon Ball Z",
        gifs: [
            "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDNkMDMwbTN1aTh2YW9tbzJiajQzcThsdmhpZXQxbDJxbDM0MjJiZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9p8EIennsHNJe/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ODB5bWQyazJ1M3U0NTE4ODN1ZTd3YWtlOHM4OWpkZWFoNWRhN3EyMCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/SaSAUwiGPsPtswfPRk/giphy.gif"
        ]
    },
    {
        anime: "Cyberpunk: Edgerunner",
        gifs:[
            "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3a25hM3h2YW5manh5bjdjZ3B2YWR2OXR5YWZhejAyZDlja3pqcTFxbSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/TO5meWLySRoZg0GX99/giphy.gif"
        ]
    }
];

// Helper to pick a random anime and a random gif from that anime on mount
const getRandomAnime = () => {
    const randomAnimeEntry = animeList[Math.floor(Math.random() * animeList.length)];
    const randomGif = randomAnimeEntry.gifs[Math.floor(Math.random() * randomAnimeEntry.gifs.length)];
    return { anime: randomAnimeEntry.anime, gif: randomGif };
};

export function useAnimeQuote() {
    // We want the random anime to be picked once when the hook is first used
    const { data: animeData } = useQuery({
        queryKey: ['randomAnime'],
        queryFn: () => getRandomAnime(),
        staleTime: Infinity, // Never refetch this so the GIF doesn't change on window focus
    });

    const quoteQuery = useQuery({
        queryKey: ['animeQuote', animeData?.anime],
        queryFn: async () => {
            if (!animeData) return null;
            
            const response = await fetch(`https://api.animechan.io/v1/quotes/random?anime=${encodeURIComponent(animeData.anime)}`);
            if (!response.ok) {
                throw new Error("Failed to fetch quote");
            }
            const resJson = await response.json();
            
            let quoteText = "Lost in the void...";
            let characterName = "Unknown";
            
            if (resJson.data) {
                quoteText = resJson.data.content || resJson.data.quote;
                characterName = resJson.data.character?.name || resJson.data.character;
            } else if (resJson.quote) {
                quoteText = resJson.quote;
                characterName = resJson.character;
            }
            
            if (!quoteText || !characterName) {
                throw new Error("Invalid quote format");
            }

            return { quote: quoteText, character: characterName };
        },
        enabled: !!animeData, // Only fetch quote once we have picked the anime
        retry: 1,
        staleTime: Infinity, // Keep the same quote
    });

    return {
        anime: animeData,
        quoteInfo: quoteQuery.data,
        isLoading: quoteQuery.isLoading || !animeData,
        isError: quoteQuery.isError,
    };
}
