import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Bell,
  CalendarHeart,
  Heart,
  Trash2,
  Home as HomeIcon,
  Gift,
  Shuffle,
  Globe,
  ChevronDown,
} from "lucide-react";

const COLORS = {
  bgTop: "#EAE1F7",
  bgBottom: "#C6ACE8",
  paper: "#FFFFFF",
  paperDim: "#F0E7FA",
  violet: "#2C3568",
  violetDeep: "#1B2247",
  pink: "#C88CC4",
  pinkDeep: "#9A5A96",
  blue: "#5B7BA6",
  gold: "#B8963E",
  ink: "#1B2247",
  inkSoft: "#4F5580",
};

const AMAZON_TAG = "100giftideas-20";

const MARKETPLACES = [
  { code: "US", domain: "amazon.com", flag: "🇺🇸" },
  { code: "CA", domain: "amazon.ca", flag: "🇨🇦" },
  { code: "UK", domain: "amazon.co.uk", flag: "🇬🇧" },
  { code: "IT", domain: "amazon.it", flag: "🇮🇹" },
  { code: "DE", domain: "amazon.de", flag: "🇩🇪" },
  { code: "FR", domain: "amazon.fr", flag: "🇫🇷" },
  { code: "ES", domain: "amazon.es", flag: "🇪🇸" },
  { code: "NL", domain: "amazon.nl", flag: "🇳🇱" },
  { code: "PL", domain: "amazon.pl", flag: "🇵🇱" },
  { code: "SE", domain: "amazon.se", flag: "🇸🇪" },
];

const LANGUAGES = [
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "it", flag: "🇮🇹", label: "IT" },
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "de", flag: "🇩🇪", label: "DE" },
  { code: "nl", flag: "🇳🇱", label: "NL" },
  { code: "da", flag: "🇩🇰", label: "DA" },
  { code: "no", flag: "🇳🇴", label: "NO" },
  { code: "fi", flag: "🇫🇮", label: "FI" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "hi", flag: "🇮🇳", label: "HI" },
];

const LANG_NAMES = {
  en: "English",
  it: "Italian",
  fr: "French",
  de: "German",
  nl: "Dutch",
  da: "Danish",
  no: "Norwegian",
  fi: "Finnish",
  es: "Spanish",
  hi: "Hindi",
};

const FONT_IMPORT_URL =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,600&family=Work+Sans:wght@400;500;600;700&display=swap";

const QUESTIONS_BY_LANG = {
  en: [
    {
      key: "relationship",
      title: "Who's the gift for?",
      type: "single",
      options: [
        { label: "Myself", emoji: "🙋" },
        { label: "Partner", emoji: "💛" },
        { label: "Best friend", emoji: "👯" },
        { label: "Friend", emoji: "🤝" },
        { label: "Parent", emoji: "👪" },
        { label: "Grandparent", emoji: "👴" },
        { label: "Coworker", emoji: "💼" },
        { label: "Sibling", emoji: "🧡" },
        { label: "Child", emoji: "🧒" },
        { label: "Not close, but I have to", emoji: "😅" },
        { label: "Other", emoji: "🎁" },
      ],
    },
    {
      key: "gender",
      title: "Any gender to keep in mind?",
      subtitle: "Helps tailor the style of the ideas",
      type: "single",
      options: [
        { label: "Man", emoji: "👨" },
        { label: "Woman", emoji: "👩" },
        { label: "No preference", emoji: "🌈" },
      ],
    },
    {
      key: "occasion",
      title: "What's the occasion?",
      type: "single",
      options: [
        { label: "Birthday", emoji: "🎂" },
        { label: "Christmas", emoji: "🎄" },
        { label: "Anniversary", emoji: "💍" },
        { label: "Wedding", emoji: "👰" },
        { label: "New baby", emoji: "👶" },
        { label: "New job / new chapter", emoji: "🚀" },
        { label: "A milestone reached", emoji: "🏅" },
        { label: "Graduation", emoji: "🎓" },
        { label: "Valentine's Day", emoji: "💘" },
        { label: "Mother's/Father's Day", emoji: "🌷" },
        { label: "Just broke up", emoji: "💔" },
        { label: "Just because", emoji: "🌟" },
      ],
    },
    {
      key: "age",
      title: "How old are they?",
      type: "single",
      options: [
        { label: "Under 12", emoji: "🧸" },
        { label: "13–19", emoji: "🎧" },
        { label: "20–35", emoji: "🌱" },
        { label: "36–55", emoji: "🧭" },
        { label: "55+", emoji: "🌿" },
      ],
    },
    {
      key: "interests",
      title: "What do they love?",
      subtitle: "Pick up to 3",
      type: "multi",
      maxSelect: 3,
      options: [
        { label: "Cooking", emoji: "🍳" },
        { label: "Reading", emoji: "📚" },
        { label: "Sports & fitness", emoji: "🏋️" },
        { label: "Tech", emoji: "📱" },
        { label: "Fashion & style", emoji: "👗" },
        { label: "Home & design", emoji: "🏡" },
        { label: "Travel", emoji: "✈️" },
        { label: "Music", emoji: "🎧" },
        { label: "Art & creativity", emoji: "🎨" },
        { label: "Wellness & relaxation", emoji: "🧘" },
        { label: "Gardening", emoji: "🌱" },
        { label: "Gaming", emoji: "🎮" },
        { label: "Photography", emoji: "📷" },
        { label: "Cars & motorcycles", emoji: "🏎️" },
        { label: "Wine & cocktails", emoji: "🍷" },
        { label: "Pets", emoji: "🐾" },
        { label: "DIY & tools", emoji: "🔨" },
        { label: "Movies & TV", emoji: "🎬" },
        { label: "Watches & jewelry", emoji: "⌚" },
        { label: "Coffee & tea", emoji: "☕" },
        { label: "Collecting", emoji: "🧩" },
        { label: "Parenting & babies", emoji: "🍼" },
      ],
    },
    {
      key: "personality",
      title: "What's their personality like?",
      subtitle: "Optional — e.g. \"loves surprises\", \"very minimalist\", \"obsessed with plants\"",
      type: "text",
      placeholder: "A few words about their character or passions...",
    },
    {
      key: "budget",
      title: "How much do you want to spend?",
      type: "single",
      options: [
        { label: "$0–25", emoji: "🪙" },
        { label: "$25–50", emoji: "💶" },
        { label: "$50–100", emoji: "💰" },
        { label: "$100–200", emoji: "💵" },
        { label: "$200–400", emoji: "💎" },
        { label: "$400–1,000", emoji: "🏆" },
        { label: "Over $1,000", emoji: "👑" },
      ],
    },
  ],
  it: [
    {
      key: "relationship",
      title: "Per chi è il regalo?",
      type: "single",
      options: [
        { label: "Me stesso/a", emoji: "🙋" },
        { label: "Partner", emoji: "💛" },
        { label: "Migliore amico/a", emoji: "👯" },
        { label: "Amico/a", emoji: "🤝" },
        { label: "Genitore", emoji: "👪" },
        { label: "Nonno/a", emoji: "👴" },
        { label: "Collega", emoji: "💼" },
        { label: "Fratello o sorella", emoji: "🧡" },
        { label: "Figlio/a", emoji: "🧒" },
        { label: "Non siamo vicini, ma devo", emoji: "😅" },
        { label: "Altro", emoji: "🎁" },
      ],
    },
    {
      key: "gender",
      title: "Un genere da tenere a mente?",
      subtitle: "Aiuta a orientare lo stile delle idee",
      type: "single",
      options: [
        { label: "Uomo", emoji: "👨" },
        { label: "Donna", emoji: "👩" },
        { label: "Nessuna preferenza", emoji: "🌈" },
      ],
    },
    {
      key: "occasion",
      title: "Qual è l'occasione?",
      type: "single",
      options: [
        { label: "Compleanno", emoji: "🎂" },
        { label: "Natale", emoji: "🎄" },
        { label: "Anniversario", emoji: "💍" },
        { label: "Matrimonio", emoji: "👰" },
        { label: "Nascita", emoji: "👶" },
        { label: "Nuova avventura lavorativa", emoji: "🚀" },
        { label: "Un traguardo raggiunto", emoji: "🏅" },
        { label: "Laurea", emoji: "🎓" },
        { label: "San Valentino", emoji: "💘" },
        { label: "Festa mamma/papà", emoji: "🌷" },
        { label: "Ci siamo appena lasciati", emoji: "💔" },
        { label: "Giusto perché", emoji: "🌟" },
      ],
    },
    {
      key: "age",
      title: "Che età ha?",
      type: "single",
      options: [
        { label: "Meno di 12 anni", emoji: "🧸" },
        { label: "13–19 anni", emoji: "🎧" },
        { label: "20–35 anni", emoji: "🌱" },
        { label: "36–55 anni", emoji: "🧭" },
        { label: "Più di 55 anni", emoji: "🌿" },
      ],
    },
    {
      key: "interests",
      title: "Cosa ama fare?",
      subtitle: "Scegli fino a 3",
      type: "multi",
      maxSelect: 3,
      options: [
        { label: "Cucina", emoji: "🍳" },
        { label: "Lettura", emoji: "📚" },
        { label: "Sport e fitness", emoji: "🏋️" },
        { label: "Tecnologia", emoji: "📱" },
        { label: "Moda e stile", emoji: "👗" },
        { label: "Casa e design", emoji: "🏡" },
        { label: "Viaggi", emoji: "✈️" },
        { label: "Musica", emoji: "🎧" },
        { label: "Arte e creatività", emoji: "🎨" },
        { label: "Benessere e relax", emoji: "🧘" },
        { label: "Giardinaggio", emoji: "🌱" },
        { label: "Videogiochi", emoji: "🎮" },
        { label: "Fotografia", emoji: "📷" },
        { label: "Auto e moto", emoji: "🏎️" },
        { label: "Vino e cocktail", emoji: "🍷" },
        { label: "Animali domestici", emoji: "🐾" },
        { label: "Bricolage e fai da te", emoji: "🔨" },
        { label: "Cinema e serie TV", emoji: "🎬" },
        { label: "Orologi e gioielli", emoji: "⌚" },
        { label: "Caffè e tè", emoji: "☕" },
        { label: "Collezionismo", emoji: "🧩" },
        { label: "Genitorialità e bimbi", emoji: "🍼" },
      ],
    },
    {
      key: "personality",
      title: "Com'è il suo carattere?",
      subtitle: "Facoltativo — es. \"ama le sorprese\", \"molto minimalista\", \"ossessionato dalle piante\"",
      type: "text",
      placeholder: "Qualche parola sul suo carattere o le sue passioni...",
    },
    {
      key: "budget",
      title: "Quanto vuoi spendere?",
      type: "single",
      options: [
        { label: "0–25€", emoji: "🪙" },
        { label: "25–50€", emoji: "💶" },
        { label: "50–100€", emoji: "💰" },
        { label: "100–200€", emoji: "💵" },
        { label: "200–400€", emoji: "💎" },
        { label: "400–1.000€", emoji: "🏆" },
        { label: "Oltre 1.000€", emoji: "👑" },
      ],
    },
  ],
  fr: [
    {
      key: "relationship",
      title: "Pour qui est le cadeau ?",
      type: "single",
      options: [
        { label: "Moi-même", emoji: "🙋" },
        { label: "Partenaire", emoji: "💛" },
        { label: "Meilleur(e) ami(e)", emoji: "👯" },
        { label: "Ami(e)", emoji: "🤝" },
        { label: "Parent", emoji: "👪" },
        { label: "Grand-parent", emoji: "👴" },
        { label: "Collègue", emoji: "💼" },
        { label: "Frère ou sœur", emoji: "🧡" },
        { label: "Enfant", emoji: "🧒" },
        { label: "Pas proche, mais j'y suis obligé(e)", emoji: "😅" },
        { label: "Autre", emoji: "🎁" },
      ],
    },
    {
      key: "gender",
      title: "Un genre à garder à l'esprit ?",
      subtitle: "Aide à orienter le style des idées",
      type: "single",
      options: [
        { label: "Homme", emoji: "👨" },
        { label: "Femme", emoji: "👩" },
        { label: "Aucune préférence", emoji: "🌈" },
      ],
    },
    {
      key: "occasion",
      title: "Quelle est l'occasion ?",
      type: "single",
      options: [
        { label: "Anniversaire", emoji: "🎂" },
        { label: "Noël", emoji: "🎄" },
        { label: "Anniversaire de couple", emoji: "💍" },
        { label: "Mariage", emoji: "👰" },
        { label: "Naissance", emoji: "👶" },
        { label: "Nouveau travail / nouveau chapitre", emoji: "🚀" },
        { label: "Une étape franchie", emoji: "🏅" },
        { label: "Diplôme", emoji: "🎓" },
        { label: "Saint-Valentin", emoji: "💘" },
        { label: "Fête des mères/pères", emoji: "🌷" },
        { label: "On vient de rompre", emoji: "💔" },
        { label: "Juste comme ça", emoji: "🌟" },
      ],
    },
    {
      key: "age",
      title: "Quel âge a cette personne ?",
      type: "single",
      options: [
        { label: "Moins de 12 ans", emoji: "🧸" },
        { label: "13–19 ans", emoji: "🎧" },
        { label: "20–35 ans", emoji: "🌱" },
        { label: "36–55 ans", emoji: "🧭" },
        { label: "55 ans et plus", emoji: "🌿" },
      ],
    },
    {
      key: "interests",
      title: "Qu'est-ce qu'elle/il aime ?",
      subtitle: "Choisissez jusqu'à 3",
      type: "multi",
      maxSelect: 3,
      options: [
        { label: "Cuisine", emoji: "🍳" },
        { label: "Lecture", emoji: "📚" },
        { label: "Sport et fitness", emoji: "🏋️" },
        { label: "Technologie", emoji: "📱" },
        { label: "Mode et style", emoji: "👗" },
        { label: "Maison et design", emoji: "🏡" },
        { label: "Voyages", emoji: "✈️" },
        { label: "Musique", emoji: "🎧" },
        { label: "Art et créativité", emoji: "🎨" },
        { label: "Bien-être et détente", emoji: "🧘" },
        { label: "Jardinage", emoji: "🌱" },
        { label: "Jeux vidéo", emoji: "🎮" },
        { label: "Photographie", emoji: "📷" },
        { label: "Voitures et motos", emoji: "🏎️" },
        { label: "Vin et cocktails", emoji: "🍷" },
        { label: "Animaux de compagnie", emoji: "🐾" },
        { label: "Bricolage", emoji: "🔨" },
        { label: "Cinéma et séries", emoji: "🎬" },
        { label: "Montres et bijoux", emoji: "⌚" },
        { label: "Café et thé", emoji: "☕" },
        { label: "Collection", emoji: "🧩" },
        { label: "Parentalité et bébés", emoji: "🍼" },
      ],
    },
    {
      key: "personality",
      title: "Comment est son caractère ?",
      subtitle: "Facultatif — ex. « aime les surprises », « très minimaliste », « obsédé(e) par les plantes »",
      type: "text",
      placeholder: "Quelques mots sur son caractère ou ses passions...",
    },
    {
      key: "budget",
      title: "Combien voulez-vous dépenser ?",
      type: "single",
      options: [
        { label: "0–25 €", emoji: "🪙" },
        { label: "25–50 €", emoji: "💶" },
        { label: "50–100 €", emoji: "💰" },
        { label: "100–200 €", emoji: "💵" },
        { label: "200–400 €", emoji: "💎" },
        { label: "400–1 000 €", emoji: "🏆" },
        { label: "Plus de 1 000 €", emoji: "👑" },
      ],
    },
  ],
  de: [
    {
      key: "relationship",
      title: "Für wen ist das Geschenk?",
      type: "single",
      options: [
        { label: "Mich selbst", emoji: "🙋" },
        { label: "Partner/in", emoji: "💛" },
        { label: "Beste/r Freund/in", emoji: "👯" },
        { label: "Freund/in", emoji: "🤝" },
        { label: "Elternteil", emoji: "👪" },
        { label: "Großelternteil", emoji: "👴" },
        { label: "Kollege/in", emoji: "💼" },
        { label: "Geschwister", emoji: "🧡" },
        { label: "Kind", emoji: "🧒" },
        { label: "Nicht nahestehend, aber ich muss", emoji: "😅" },
        { label: "Andere", emoji: "🎁" },
      ],
    },
    {
      key: "gender",
      title: "Ein Geschlecht, das ich beachten soll?",
      subtitle: "Hilft, den Stil der Ideen anzupassen",
      type: "single",
      options: [
        { label: "Mann", emoji: "👨" },
        { label: "Frau", emoji: "👩" },
        { label: "Keine Präferenz", emoji: "🌈" },
      ],
    },
    {
      key: "occasion",
      title: "Was ist der Anlass?",
      type: "single",
      options: [
        { label: "Geburtstag", emoji: "🎂" },
        { label: "Weihnachten", emoji: "🎄" },
        { label: "Jahrestag", emoji: "💍" },
        { label: "Hochzeit", emoji: "👰" },
        { label: "Neugeborenes", emoji: "👶" },
        { label: "Neuer Job / neues Kapitel", emoji: "🚀" },
        { label: "Ein erreichter Meilenstein", emoji: "🏅" },
        { label: "Abschluss", emoji: "🎓" },
        { label: "Valentinstag", emoji: "💘" },
        { label: "Mutter-/Vatertag", emoji: "🌷" },
        { label: "Gerade getrennt", emoji: "💔" },
        { label: "Einfach so", emoji: "🌟" },
      ],
    },
    {
      key: "age",
      title: "Wie alt ist die Person?",
      type: "single",
      options: [
        { label: "Unter 12", emoji: "🧸" },
        { label: "13–19", emoji: "🎧" },
        { label: "20–35", emoji: "🌱" },
        { label: "36–55", emoji: "🧭" },
        { label: "55+", emoji: "🌿" },
      ],
    },
    {
      key: "interests",
      title: "Was liebt diese Person?",
      subtitle: "Wähle bis zu 3",
      type: "multi",
      maxSelect: 3,
      options: [
        { label: "Kochen", emoji: "🍳" },
        { label: "Lesen", emoji: "📚" },
        { label: "Sport & Fitness", emoji: "🏋️" },
        { label: "Technik", emoji: "📱" },
        { label: "Mode & Stil", emoji: "👗" },
        { label: "Wohnen & Design", emoji: "🏡" },
        { label: "Reisen", emoji: "✈️" },
        { label: "Musik", emoji: "🎧" },
        { label: "Kunst & Kreativität", emoji: "🎨" },
        { label: "Wellness & Entspannung", emoji: "🧘" },
        { label: "Gärtnern", emoji: "🌱" },
        { label: "Gaming", emoji: "🎮" },
        { label: "Fotografie", emoji: "📷" },
        { label: "Autos & Motorräder", emoji: "🏎️" },
        { label: "Wein & Cocktails", emoji: "🍷" },
        { label: "Haustiere", emoji: "🐾" },
        { label: "Heimwerken", emoji: "🔨" },
        { label: "Filme & Serien", emoji: "🎬" },
        { label: "Uhren & Schmuck", emoji: "⌚" },
        { label: "Kaffee & Tee", emoji: "☕" },
        { label: "Sammeln", emoji: "🧩" },
        { label: "Elternschaft & Babys", emoji: "🍼" },
      ],
    },
    {
      key: "personality",
      title: "Wie ist die Persönlichkeit?",
      subtitle: "Optional — z. B. „liebt Überraschungen“, „sehr minimalistisch“, „verrückt nach Pflanzen“",
      type: "text",
      placeholder: "Ein paar Worte zu Charakter oder Leidenschaften...",
    },
    {
      key: "budget",
      title: "Wie viel möchtest du ausgeben?",
      type: "single",
      options: [
        { label: "0–25 €", emoji: "🪙" },
        { label: "25–50 €", emoji: "💶" },
        { label: "50–100 €", emoji: "💰" },
        { label: "100–200 €", emoji: "💵" },
        { label: "200–400 €", emoji: "💎" },
        { label: "400–1.000 €", emoji: "🏆" },
        { label: "Über 1.000 €", emoji: "👑" },
      ],
    },
  ],
  nl: [
    {
      key: "relationship",
      title: "Voor wie is het cadeau?",
      type: "single",
      options: [
        { label: "Mezelf", emoji: "🙋" },
        { label: "Partner", emoji: "💛" },
        { label: "Beste vriend(in)", emoji: "👯" },
        { label: "Vriend(in)", emoji: "🤝" },
        { label: "Ouder", emoji: "👪" },
        { label: "Grootouder", emoji: "👴" },
        { label: "Collega", emoji: "💼" },
        { label: "Broer of zus", emoji: "🧡" },
        { label: "Kind", emoji: "🧒" },
        { label: "Niet close, maar het moet", emoji: "😅" },
        { label: "Anders", emoji: "🎁" },
      ],
    },
    {
      key: "gender",
      title: "Een geslacht om rekening mee te houden?",
      subtitle: "Helpt om de stijl van de ideeën af te stemmen",
      type: "single",
      options: [
        { label: "Man", emoji: "👨" },
        { label: "Vrouw", emoji: "👩" },
        { label: "Geen voorkeur", emoji: "🌈" },
      ],
    },
    {
      key: "occasion",
      title: "Wat is de gelegenheid?",
      type: "single",
      options: [
        { label: "Verjaardag", emoji: "🎂" },
        { label: "Kerstmis", emoji: "🎄" },
        { label: "Jubileum", emoji: "💍" },
        { label: "Bruiloft", emoji: "👰" },
        { label: "Nieuwe baby", emoji: "👶" },
        { label: "Nieuwe baan / nieuw hoofdstuk", emoji: "🚀" },
        { label: "Een bereikte mijlpaal", emoji: "🏅" },
        { label: "Afstuderen", emoji: "🎓" },
        { label: "Valentijnsdag", emoji: "💘" },
        { label: "Moeder-/Vaderdag", emoji: "🌷" },
        { label: "Net uit elkaar", emoji: "💔" },
        { label: "Zomaar", emoji: "🌟" },
      ],
    },
    {
      key: "age",
      title: "Hoe oud is diegene?",
      type: "single",
      options: [
        { label: "Onder de 12", emoji: "🧸" },
        { label: "13–19", emoji: "🎧" },
        { label: "20–35", emoji: "🌱" },
        { label: "36–55", emoji: "🧭" },
        { label: "55+", emoji: "🌿" },
      ],
    },
    {
      key: "interests",
      title: "Waar houdt hij/zij van?",
      subtitle: "Kies er maximaal 3",
      type: "multi",
      maxSelect: 3,
      options: [
        { label: "Koken", emoji: "🍳" },
        { label: "Lezen", emoji: "📚" },
        { label: "Sport & fitness", emoji: "🏋️" },
        { label: "Technologie", emoji: "📱" },
        { label: "Mode & stijl", emoji: "👗" },
        { label: "Wonen & design", emoji: "🏡" },
        { label: "Reizen", emoji: "✈️" },
        { label: "Muziek", emoji: "🎧" },
        { label: "Kunst & creativiteit", emoji: "🎨" },
        { label: "Wellness & ontspanning", emoji: "🧘" },
        { label: "Tuinieren", emoji: "🌱" },
        { label: "Gamen", emoji: "🎮" },
        { label: "Fotografie", emoji: "📷" },
        { label: "Auto's & motoren", emoji: "🏎️" },
        { label: "Wijn & cocktails", emoji: "🍷" },
        { label: "Huisdieren", emoji: "🐾" },
        { label: "Klussen", emoji: "🔨" },
        { label: "Films & series", emoji: "🎬" },
        { label: "Horloges & sieraden", emoji: "⌚" },
        { label: "Koffie & thee", emoji: "☕" },
        { label: "Verzamelen", emoji: "🧩" },
        { label: "Ouderschap & baby's", emoji: "🍼" },
      ],
    },
    {
      key: "personality",
      title: "Hoe is zijn/haar persoonlijkheid?",
      subtitle: "Optioneel — bijv. \"houdt van verrassingen\", \"erg minimalistisch\", \"geobsedeerd door planten\"",
      type: "text",
      placeholder: "Een paar woorden over karakter of passies...",
    },
    {
      key: "budget",
      title: "Hoeveel wil je uitgeven?",
      type: "single",
      options: [
        { label: "€0–25", emoji: "🪙" },
        { label: "€25–50", emoji: "💶" },
        { label: "€50–100", emoji: "💰" },
        { label: "€100–200", emoji: "💵" },
        { label: "€200–400", emoji: "💎" },
        { label: "€400–1.000", emoji: "🏆" },
        { label: "Meer dan €1.000", emoji: "👑" },
      ],
    },
  ],
  da: [
    {
      key: "relationship",
      title: "Hvem er gaven til?",
      type: "single",
      options: [
        { label: "Mig selv", emoji: "🙋" },
        { label: "Partner", emoji: "💛" },
        { label: "Bedste ven/veninde", emoji: "👯" },
        { label: "Ven/veninde", emoji: "🤝" },
        { label: "Forælder", emoji: "👪" },
        { label: "Bedsteforælder", emoji: "👴" },
        { label: "Kollega", emoji: "💼" },
        { label: "Søskende", emoji: "🧡" },
        { label: "Barn", emoji: "🧒" },
        { label: "Ikke tæt på, men jeg er nødt til det", emoji: "😅" },
        { label: "Andet", emoji: "🎁" },
      ],
    },
    {
      key: "gender",
      title: "Et køn at have i tankerne?",
      subtitle: "Hjælper med at tilpasse stilen på idéerne",
      type: "single",
      options: [
        { label: "Mand", emoji: "👨" },
        { label: "Kvinde", emoji: "👩" },
        { label: "Ingen præference", emoji: "🌈" },
      ],
    },
    {
      key: "occasion",
      title: "Hvad er anledningen?",
      type: "single",
      options: [
        { label: "Fødselsdag", emoji: "🎂" },
        { label: "Jul", emoji: "🎄" },
        { label: "Jubilæum", emoji: "💍" },
        { label: "Bryllup", emoji: "👰" },
        { label: "Nyfødt", emoji: "👶" },
        { label: "Nyt job / nyt kapitel", emoji: "🚀" },
        { label: "En nået milepæl", emoji: "🏅" },
        { label: "Dimission", emoji: "🎓" },
        { label: "Valentinsdag", emoji: "💘" },
        { label: "Lige slået op", emoji: "💔" },
        { label: "Mors-/Fars dag", emoji: "🌷" },
        { label: "Bare fordi", emoji: "🌟" },
      ],
    },
    {
      key: "age",
      title: "Hvor gammel er personen?",
      type: "single",
      options: [
        { label: "Under 12", emoji: "🧸" },
        { label: "13–19", emoji: "🎧" },
        { label: "20–35", emoji: "🌱" },
        { label: "36–55", emoji: "🧭" },
        { label: "55+", emoji: "🌿" },
      ],
    },
    {
      key: "interests",
      title: "Hvad elsker personen?",
      subtitle: "Vælg op til 3",
      type: "multi",
      maxSelect: 3,
      options: [
        { label: "Madlavning", emoji: "🍳" },
        { label: "Læsning", emoji: "📚" },
        { label: "Sport & fitness", emoji: "🏋️" },
        { label: "Teknologi", emoji: "📱" },
        { label: "Mode & stil", emoji: "👗" },
        { label: "Hjem & design", emoji: "🏡" },
        { label: "Rejser", emoji: "✈️" },
        { label: "Musik", emoji: "🎧" },
        { label: "Kunst & kreativitet", emoji: "🎨" },
        { label: "Velvære & afslapning", emoji: "🧘" },
        { label: "Havearbejde", emoji: "🌱" },
        { label: "Gaming", emoji: "🎮" },
        { label: "Fotografi", emoji: "📷" },
        { label: "Biler & motorcykler", emoji: "🏎️" },
        { label: "Vin & cocktails", emoji: "🍷" },
        { label: "Kæledyr", emoji: "🐾" },
        { label: "Gør-det-selv", emoji: "🔨" },
        { label: "Film & serier", emoji: "🎬" },
        { label: "Ure & smykker", emoji: "⌚" },
        { label: "Kaffe & te", emoji: "☕" },
        { label: "Samling", emoji: "🧩" },
        { label: "Forældreskab & babyer", emoji: "🍼" },
      ],
    },
    {
      key: "personality",
      title: "Hvordan er personens personlighed?",
      subtitle: "Valgfrit — fx \"elsker overraskelser\", \"meget minimalistisk\", \"besat af planter\"",
      type: "text",
      placeholder: "Et par ord om karakter eller passioner...",
    },
    {
      key: "budget",
      title: "Hvor meget vil du bruge?",
      type: "single",
      options: [
        { label: "0–25 €", emoji: "🪙" },
        { label: "25–50 €", emoji: "💶" },
        { label: "50–100 €", emoji: "💰" },
        { label: "100–200 €", emoji: "💵" },
        { label: "200–400 €", emoji: "💎" },
        { label: "400–1.000 €", emoji: "🏆" },
        { label: "Over 1.000 €", emoji: "👑" },
      ],
    },
  ],
  no: [
    {
      key: "relationship",
      title: "Hvem er gaven til?",
      type: "single",
      options: [
        { label: "Meg selv", emoji: "🙋" },
        { label: "Partner", emoji: "💛" },
        { label: "Bestevenn", emoji: "👯" },
        { label: "Venn", emoji: "🤝" },
        { label: "Forelder", emoji: "👪" },
        { label: "Besteforelder", emoji: "👴" },
        { label: "Kollega", emoji: "💼" },
        { label: "Søsken", emoji: "🧡" },
        { label: "Barn", emoji: "🧒" },
        { label: "Ikke nær, men jeg må", emoji: "😅" },
        { label: "Annet", emoji: "🎁" },
      ],
    },
    {
      key: "gender",
      title: "Et kjønn å ha i tankene?",
      subtitle: "Hjelper med å tilpasse stilen på idéene",
      type: "single",
      options: [
        { label: "Mann", emoji: "👨" },
        { label: "Kvinne", emoji: "👩" },
        { label: "Ingen preferanse", emoji: "🌈" },
      ],
    },
    {
      key: "occasion",
      title: "Hva er anledningen?",
      type: "single",
      options: [
        { label: "Bursdag", emoji: "🎂" },
        { label: "Jul", emoji: "🎄" },
        { label: "Jubileum", emoji: "💍" },
        { label: "Bryllup", emoji: "👰" },
        { label: "Nyfødt", emoji: "👶" },
        { label: "Ny jobb / nytt kapittel", emoji: "🚀" },
        { label: "En nådd milepæl", emoji: "🏅" },
        { label: "Eksamen", emoji: "🎓" },
        { label: "Valentinsdagen", emoji: "💘" },
        { label: "Nettopp slått opp", emoji: "💔" },
        { label: "Mors-/Farsdag", emoji: "🌷" },
        { label: "Bare fordi", emoji: "🌟" },
      ],
    },
    {
      key: "age",
      title: "Hvor gammel er personen?",
      type: "single",
      options: [
        { label: "Under 12", emoji: "🧸" },
        { label: "13–19", emoji: "🎧" },
        { label: "20–35", emoji: "🌱" },
        { label: "36–55", emoji: "🧭" },
        { label: "55+", emoji: "🌿" },
      ],
    },
    {
      key: "interests",
      title: "Hva elsker personen?",
      subtitle: "Velg opptil 3",
      type: "multi",
      maxSelect: 3,
      options: [
        { label: "Matlaging", emoji: "🍳" },
        { label: "Lesing", emoji: "📚" },
        { label: "Sport & trening", emoji: "🏋️" },
        { label: "Teknologi", emoji: "📱" },
        { label: "Mote & stil", emoji: "👗" },
        { label: "Hjem & design", emoji: "🏡" },
        { label: "Reise", emoji: "✈️" },
        { label: "Musikk", emoji: "🎧" },
        { label: "Kunst & kreativitet", emoji: "🎨" },
        { label: "Velvære & avslapning", emoji: "🧘" },
        { label: "Hagearbeid", emoji: "🌱" },
        { label: "Gaming", emoji: "🎮" },
        { label: "Fotografering", emoji: "📷" },
        { label: "Biler & motorsykler", emoji: "🏎️" },
        { label: "Vin & cocktailer", emoji: "🍷" },
        { label: "Kjæledyr", emoji: "🐾" },
        { label: "Gjør-det-selv", emoji: "🔨" },
        { label: "Filmer & serier", emoji: "🎬" },
        { label: "Klokker & smykker", emoji: "⌚" },
        { label: "Kaffe & te", emoji: "☕" },
        { label: "Samling", emoji: "🧩" },
        { label: "Foreldreskap & babyer", emoji: "🍼" },
      ],
    },
    {
      key: "personality",
      title: "Hvordan er personligheten?",
      subtitle: "Valgfritt — f.eks. «elsker overraskelser», «veldig minimalistisk», «besatt av planter»",
      type: "text",
      placeholder: "Noen ord om karakter eller lidenskaper...",
    },
    {
      key: "budget",
      title: "Hvor mye vil du bruke?",
      type: "single",
      options: [
        { label: "0–25 €", emoji: "🪙" },
        { label: "25–50 €", emoji: "💶" },
        { label: "50–100 €", emoji: "💰" },
        { label: "100–200 €", emoji: "💵" },
        { label: "200–400 €", emoji: "💎" },
        { label: "400–1.000 €", emoji: "🏆" },
        { label: "Over 1.000 €", emoji: "👑" },
      ],
    },
  ],
  fi: [
    {
      key: "relationship",
      title: "Kenelle lahja on?",
      type: "single",
      options: [
        { label: "Itselleni", emoji: "🙋" },
        { label: "Kumppani", emoji: "💛" },
        { label: "Paras ystävä", emoji: "👯" },
        { label: "Ystävä", emoji: "🤝" },
        { label: "Vanhempi", emoji: "👪" },
        { label: "Isovanhempi", emoji: "👴" },
        { label: "Työkaveri", emoji: "💼" },
        { label: "Sisarus", emoji: "🧡" },
        { label: "Lapsi", emoji: "🧒" },
        { label: "Ei läheinen, mutta minun on pakko", emoji: "😅" },
        { label: "Muu", emoji: "🎁" },
      ],
    },
    {
      key: "gender",
      title: "Sukupuoli, joka kannattaa huomioida?",
      subtitle: "Auttaa räätälöimään ideoiden tyyliä",
      type: "single",
      options: [
        { label: "Mies", emoji: "👨" },
        { label: "Nainen", emoji: "👩" },
        { label: "Ei väliä", emoji: "🌈" },
      ],
    },
    {
      key: "occasion",
      title: "Mikä on tilaisuus?",
      type: "single",
      options: [
        { label: "Syntymäpäivä", emoji: "🎂" },
        { label: "Joulu", emoji: "🎄" },
        { label: "Vuosipäivä", emoji: "💍" },
        { label: "Häät", emoji: "👰" },
        { label: "Uusi vauva", emoji: "👶" },
        { label: "Uusi työ / uusi luku", emoji: "🚀" },
        { label: "Saavutettu virstanpylväs", emoji: "🏅" },
        { label: "Valmistujaiset", emoji: "🎓" },
        { label: "Ystävänpäivä", emoji: "💘" },
        { label: "Äitien-/Isänpäivä", emoji: "🌷" },
        { label: "Juuri erottu", emoji: "💔" },
        { label: "Vain koska", emoji: "🌟" },
      ],
    },
    {
      key: "age",
      title: "Kuinka vanha henkilö on?",
      type: "single",
      options: [
        { label: "Alle 12", emoji: "🧸" },
        { label: "13–19", emoji: "🎧" },
        { label: "20–35", emoji: "🌱" },
        { label: "36–55", emoji: "🧭" },
        { label: "55+", emoji: "🌿" },
      ],
    },
    {
      key: "interests",
      title: "Mistä hän pitää?",
      subtitle: "Valitse enintään 3",
      type: "multi",
      maxSelect: 3,
      options: [
        { label: "Ruoanlaitto", emoji: "🍳" },
        { label: "Lukeminen", emoji: "📚" },
        { label: "Urheilu ja kuntoilu", emoji: "🏋️" },
        { label: "Teknologia", emoji: "📱" },
        { label: "Muoti ja tyyli", emoji: "👗" },
        { label: "Koti ja design", emoji: "🏡" },
        { label: "Matkustelu", emoji: "✈️" },
        { label: "Musiikki", emoji: "🎧" },
        { label: "Taide ja luovuus", emoji: "🎨" },
        { label: "Hyvinvointi ja rentoutuminen", emoji: "🧘" },
        { label: "Puutarhanhoito", emoji: "🌱" },
        { label: "Pelaaminen", emoji: "🎮" },
        { label: "Valokuvaus", emoji: "📷" },
        { label: "Autot ja moottoripyörät", emoji: "🏎️" },
        { label: "Viini ja cocktailit", emoji: "🍷" },
        { label: "Lemmikit", emoji: "🐾" },
        { label: "Askartelu ja työkalut", emoji: "🔨" },
        { label: "Elokuvat ja sarjat", emoji: "🎬" },
        { label: "Kellot ja korut", emoji: "⌚" },
        { label: "Kahvi ja tee", emoji: "☕" },
        { label: "Keräily", emoji: "🧩" },
        { label: "Vanhemmuus ja vauvat", emoji: "🍼" },
      ],
    },
    {
      key: "personality",
      title: "Millainen hänen persoonallisuutensa on?",
      subtitle: "Valinnainen — esim. \"rakastaa yllätyksiä\", \"hyvin minimalistinen\", \"kasvien pauloissa\"",
      type: "text",
      placeholder: "Muutama sana luonteesta tai intohimoista...",
    },
    {
      key: "budget",
      title: "Kuinka paljon haluat käyttää?",
      type: "single",
      options: [
        { label: "0–25 €", emoji: "🪙" },
        { label: "25–50 €", emoji: "💶" },
        { label: "50–100 €", emoji: "💰" },
        { label: "100–200 €", emoji: "💵" },
        { label: "200–400 €", emoji: "💎" },
        { label: "400–1.000 €", emoji: "🏆" },
        { label: "Yli 1.000 €", emoji: "👑" },
      ],
    },
  ],
  es: [
    {
      key: "relationship",
      title: "¿Para quién es el regalo?",
      type: "single",
      options: [
        { label: "Yo mismo/a", emoji: "🙋" },
        { label: "Pareja", emoji: "💛" },
        { label: "Mejor amigo/a", emoji: "👯" },
        { label: "Amigo/a", emoji: "🤝" },
        { label: "Padre/Madre", emoji: "👪" },
        { label: "Abuelo/a", emoji: "👴" },
        { label: "Compañero/a de trabajo", emoji: "💼" },
        { label: "Hermano/a", emoji: "🧡" },
        { label: "Hijo/a", emoji: "🧒" },
        { label: "No somos cercanos, pero tengo que", emoji: "😅" },
        { label: "Otro", emoji: "🎁" },
      ],
    },
    {
      key: "gender",
      title: "¿Algún género a tener en cuenta?",
      subtitle: "Ayuda a orientar el estilo de las ideas",
      type: "single",
      options: [
        { label: "Hombre", emoji: "👨" },
        { label: "Mujer", emoji: "👩" },
        { label: "Sin preferencia", emoji: "🌈" },
      ],
    },
    {
      key: "occasion",
      title: "¿Cuál es la ocasión?",
      type: "single",
      options: [
        { label: "Cumpleaños", emoji: "🎂" },
        { label: "Navidad", emoji: "🎄" },
        { label: "Aniversario", emoji: "💍" },
        { label: "Boda", emoji: "👰" },
        { label: "Nuevo bebé", emoji: "👶" },
        { label: "Nuevo trabajo / nueva etapa", emoji: "🚀" },
        { label: "Un logro alcanzado", emoji: "🏅" },
        { label: "Graduación", emoji: "🎓" },
        { label: "San Valentín", emoji: "💘" },
        { label: "Día de la madre/del padre", emoji: "🌷" },
        { label: "Acabamos de romper", emoji: "💔" },
        { label: "Porque sí", emoji: "🌟" },
      ],
    },
    {
      key: "age",
      title: "¿Qué edad tiene?",
      type: "single",
      options: [
        { label: "Menos de 12 años", emoji: "🧸" },
        { label: "13–19 años", emoji: "🎧" },
        { label: "20–35 años", emoji: "🌱" },
        { label: "36–55 años", emoji: "🧭" },
        { label: "Más de 55 años", emoji: "🌿" },
      ],
    },
    {
      key: "interests",
      title: "¿Qué le encanta?",
      subtitle: "Elige hasta 3",
      type: "multi",
      maxSelect: 3,
      options: [
        { label: "Cocina", emoji: "🍳" },
        { label: "Lectura", emoji: "📚" },
        { label: "Deporte y fitness", emoji: "🏋️" },
        { label: "Tecnología", emoji: "📱" },
        { label: "Moda y estilo", emoji: "👗" },
        { label: "Hogar y diseño", emoji: "🏡" },
        { label: "Viajes", emoji: "✈️" },
        { label: "Música", emoji: "🎧" },
        { label: "Arte y creatividad", emoji: "🎨" },
        { label: "Bienestar y relajación", emoji: "🧘" },
        { label: "Jardinería", emoji: "🌱" },
        { label: "Videojuegos", emoji: "🎮" },
        { label: "Fotografía", emoji: "📷" },
        { label: "Coches y motos", emoji: "🏎️" },
        { label: "Vino y cócteles", emoji: "🍷" },
        { label: "Mascotas", emoji: "🐾" },
        { label: "Bricolaje", emoji: "🔨" },
        { label: "Cine y series", emoji: "🎬" },
        { label: "Relojes y joyas", emoji: "⌚" },
        { label: "Café y té", emoji: "☕" },
        { label: "Coleccionismo", emoji: "🧩" },
        { label: "Crianza y bebés", emoji: "🍼" },
      ],
    },
    {
      key: "personality",
      title: "¿Cómo es su personalidad?",
      subtitle: "Opcional — ej. \"le encantan las sorpresas\", \"muy minimalista\", \"obsesionado/a con las plantas\"",
      type: "text",
      placeholder: "Unas palabras sobre su carácter o pasiones...",
    },
    {
      key: "budget",
      title: "¿Cuánto quieres gastar?",
      type: "single",
      options: [
        { label: "0–25 €", emoji: "🪙" },
        { label: "25–50 €", emoji: "💶" },
        { label: "50–100 €", emoji: "💰" },
        { label: "100–200 €", emoji: "💵" },
        { label: "200–400 €", emoji: "💎" },
        { label: "400–1.000 €", emoji: "🏆" },
        { label: "Más de 1.000 €", emoji: "👑" },
      ],
    },
  ],
  hi: [
    {
      key: "relationship",
      title: "यह उपहार किसके लिए है?",
      type: "single",
      options: [
        { label: "मेरे लिए", emoji: "🙋" },
        { label: "पार्टनर", emoji: "💛" },
        { label: "सबसे अच्छा दोस्त", emoji: "👯" },
        { label: "दोस्त", emoji: "🤝" },
        { label: "माता-पिता", emoji: "👪" },
        { label: "दादा-दादी/नाना-नानी", emoji: "👴" },
        { label: "सहकर्मी", emoji: "💼" },
        { label: "भाई-बहन", emoji: "🧡" },
        { label: "बच्चा", emoji: "🧒" },
        { label: "करीबी नहीं, पर देना ज़रूरी है", emoji: "😅" },
        { label: "अन्य", emoji: "🎁" },
      ],
    },
    {
      key: "gender",
      title: "ध्यान में रखने के लिए कोई लिंग?",
      subtitle: "आइडिया की शैली तय करने में मदद करता है",
      type: "single",
      options: [
        { label: "पुरुष", emoji: "👨" },
        { label: "महिला", emoji: "👩" },
        { label: "कोई पसंद नहीं", emoji: "🌈" },
      ],
    },
    {
      key: "occasion",
      title: "अवसर क्या है?",
      type: "single",
      options: [
        { label: "जन्मदिन", emoji: "🎂" },
        { label: "क्रिसमस", emoji: "🎄" },
        { label: "सालगिरह", emoji: "💍" },
        { label: "शादी", emoji: "👰" },
        { label: "नया बच्चा", emoji: "👶" },
        { label: "नई नौकरी / नई शुरुआत", emoji: "🚀" },
        { label: "एक उपलब्धि", emoji: "🏅" },
        { label: "ग्रेजुएशन", emoji: "🎓" },
        { label: "वैलेंटाइन डे", emoji: "💘" },
        { label: "मातृ/पितृ दिवस", emoji: "🌷" },
        { label: "अभी-अभी ब्रेकअप हुआ", emoji: "💔" },
        { label: "बस ऐसे ही", emoji: "🌟" },
      ],
    },
    {
      key: "age",
      title: "उनकी उम्र क्या है?",
      type: "single",
      options: [
        { label: "12 से कम", emoji: "🧸" },
        { label: "13–19", emoji: "🎧" },
        { label: "20–35", emoji: "🌱" },
        { label: "36–55", emoji: "🧭" },
        { label: "55+", emoji: "🌿" },
      ],
    },
    {
      key: "interests",
      title: "उन्हें क्या पसंद है?",
      subtitle: "अधिकतम 3 चुनें",
      type: "multi",
      maxSelect: 3,
      options: [
        { label: "खाना बनाना", emoji: "🍳" },
        { label: "पढ़ना", emoji: "📚" },
        { label: "खेल और फिटनेस", emoji: "🏋️" },
        { label: "टेक्नोलॉजी", emoji: "📱" },
        { label: "फैशन और स्टाइल", emoji: "👗" },
        { label: "घर और डिज़ाइन", emoji: "🏡" },
        { label: "यात्रा", emoji: "✈️" },
        { label: "संगीत", emoji: "🎧" },
        { label: "कला और रचनात्मकता", emoji: "🎨" },
        { label: "वेलनेस और आराम", emoji: "🧘" },
        { label: "बागवानी", emoji: "🌱" },
        { label: "गेमिंग", emoji: "🎮" },
        { label: "फोटोग्राफी", emoji: "📷" },
        { label: "कार और बाइक", emoji: "🏎️" },
        { label: "वाइन और कॉकटेल", emoji: "🍷" },
        { label: "पालतू जानवर", emoji: "🐾" },
        { label: "DIY और औज़ार", emoji: "🔨" },
        { label: "फिल्में और सीरीज़", emoji: "🎬" },
        { label: "घड़ियाँ और गहने", emoji: "⌚" },
        { label: "कॉफी और चाय", emoji: "☕" },
        { label: "संग्रह करना", emoji: "🧩" },
        { label: "पेरेंटिंग और बच्चे", emoji: "🍼" },
      ],
    },
    {
      key: "personality",
      title: "उनका स्वभाव कैसा है?",
      subtitle: "वैकल्पिक — जैसे \"सरप्राइज़ पसंद है\", \"बहुत मिनिमलिस्ट\", \"पौधों का शौक\"",
      type: "text",
      placeholder: "उनके स्वभाव या शौक के बारे में कुछ शब्द...",
    },
    {
      key: "budget",
      title: "आप कितना खर्च करना चाहते हैं?",
      type: "single",
      options: [
        { label: "₹0–1,000", emoji: "🪙" },
        { label: "₹1,000–2,500", emoji: "💶" },
        { label: "₹2,500–5,000", emoji: "💰" },
        { label: "₹5,000–10,000", emoji: "💵" },
        { label: "₹10,000–20,000", emoji: "💎" },
        { label: "₹20,000–50,000", emoji: "🏆" },
        { label: "₹50,000 से अधिक", emoji: "👑" },
      ],
    },
  ],
};

const TEXT = {
  en: {
    eyebrow: "GIFT FINDER",
    headline1: "The right gift,",
    headline2: "every time",
    newQuiz: "New quiz",
    newQuizSub: "Find 5 ideas in 60 seconds",
    freeSearchTitle: "Or just tell me what you're looking for",
    freeSearchPlaceholder: "e.g. something cozy for my sister who loves candles, under $50",
    findGifts: "Find gifts",
    savedIdeasStat: "saved ideas",
    activeReminders: "active reminders",
    todayIsDay: (name) => `Today's ${name}'s day! 🎉`,
    inDays: (name, d) => `${name} in ${d} days`,
    tapToSeeAll: "Tap to see all reminders",
    emptyHome: "Take your first quiz: you'll be able to save ideas you like and set reminders for important occasions.",
    savedTitle: "Saved ideas",
    savedSub: "The gift ideas you set aside, always within reach.",
    savedEmpty: "No saved ideas yet. Tap the heart on an idea in your quiz results to add it here.",
    shop: "Shop",
    remindersTitle: "Reminders",
    remindersSub: "Real push notifications need an external service — for now I'll show you who's coming up every time you reopen the app.",
    remindersEmpty: "No reminders saved yet. Save a person from your quiz results.",
    stepOf: (s, t) => `STEP ${s} OF ${t}`,
    continueLabel: "Continue →",
    skipLabel: "Skip →",
    tryAgain: "Try again",
    restartQuiz: "Restart quiz",
    errorTitle: "The bow came undone along the way",
    errorSub: "I couldn't generate ideas this time. Please try again in a moment.",
    moreIdeas: "5 more ideas",
    saveReminderTitle: "Save a reminder",
    namePlaceholder: "Name (e.g. Mark)",
    savedBtn: "Saved ✓",
    saveReminderBtn: "Save reminder",
    startOver: "Start over",
    priceNote: "Prices are rough estimates. Search links may include an affiliate code.",
    tabHome: "Home",
    tabQuiz: "Quiz",
    tabSaved: "Saved",
    tabReminders: "Reminders",
    loadingMsgs: ["Unwrapping some ideas...", "Checking the wish list...", "Tying the bow...", "Finding something just right..."],
  },
  it: {
    eyebrow: "GIFT FINDER",
    headline1: "Il regalo giusto,",
    headline2: "ogni volta",
    newQuiz: "Nuovo quiz",
    newQuizSub: "Trova 5 idee in 60 secondi",
    freeSearchTitle: "Oppure dimmi cosa stai cercando",
    freeSearchPlaceholder: "es. qualcosa di caldo per mia sorella che ama le candele, sotto i 50€",
    findGifts: "Trova regali",
    savedIdeasStat: "idee salvate",
    activeReminders: "promemoria attivi",
    todayIsDay: (name) => `Oggi è il turno di ${name}! 🎉`,
    inDays: (name, d) => `${name} tra ${d} giorni`,
    tapToSeeAll: "Tocca per vedere tutti i promemoria",
    emptyHome: "Fai il tuo primo quiz: potrai salvare le idee che ti piacciono e impostare promemoria per le occasioni importanti.",
    savedTitle: "Idee salvate",
    savedSub: "Le idee regalo che hai messo da parte, sempre a portata di mano.",
    savedEmpty: "Nessuna idea salvata ancora. Tocca il cuore su un'idea nei risultati per aggiungerla qui.",
    shop: "Cerca",
    remindersTitle: "Promemoria",
    remindersSub: "Le notifiche push vere richiedono un servizio esterno — per ora ti mostro qui chi si avvicina, ogni volta che riapri l'app.",
    remindersEmpty: "Nessun promemoria salvato ancora. Salva una persona dai risultati del quiz.",
    stepOf: (s, t) => `PASSO ${s} DI ${t}`,
    continueLabel: "Continua →",
    skipLabel: "Salta →",
    tryAgain: "Riprova",
    restartQuiz: "Rifai il quiz",
    errorTitle: "Il fiocco si è sciolto per strada",
    errorSub: "Non sono riuscito a generare le idee questa volta. Riprova tra un attimo.",
    moreIdeas: "Altre 5 idee",
    saveReminderTitle: "Salva un promemoria",
    namePlaceholder: "Nome (es. Marco)",
    savedBtn: "Salvato ✓",
    saveReminderBtn: "Salva promemoria",
    startOver: "Ricomincia",
    priceNote: "I prezzi sono stime indicative. I link possono includere un codice affiliato.",
    tabHome: "Home",
    tabQuiz: "Quiz",
    tabSaved: "Salvati",
    tabReminders: "Promemoria",
    loadingMsgs: ["Scartando qualche idea...", "Controllo la lista dei desideri...", "Sto legando il fiocco...", "Cerco qualcosa di perfetto..."],
  },
  fr: {
    eyebrow: "GIFT FINDER",
    headline1: "Le cadeau parfait,",
    headline2: "à chaque fois",
    newQuiz: "Nouveau quiz",
    newQuizSub: "Trouvez 5 idées en 60 secondes",
    freeSearchTitle: "Ou dites-moi simplement ce que vous cherchez",
    freeSearchPlaceholder: "ex. quelque chose de douillet pour ma sœur qui aime les bougies, sous 50 €",
    findGifts: "Trouver des cadeaux",
    savedIdeasStat: "idées enregistrées",
    activeReminders: "rappels actifs",
    todayIsDay: (name) => `C'est le jour de ${name} ! 🎉`,
    inDays: (name, d) => `${name} dans ${d} jours`,
    tapToSeeAll: "Touchez pour voir tous les rappels",
    emptyHome: "Faites votre premier quiz : vous pourrez enregistrer les idées que vous aimez et définir des rappels pour les occasions importantes.",
    savedTitle: "Idées enregistrées",
    savedSub: "Les idées cadeaux que vous avez mises de côté, toujours à portée de main.",
    savedEmpty: "Aucune idée enregistrée pour l'instant. Touchez le cœur sur une idée pour l'ajouter ici.",
    shop: "Acheter",
    remindersTitle: "Rappels",
    remindersSub: "Les vraies notifications push nécessitent un service externe — pour l'instant, je vous montre ici qui approche à chaque fois que vous rouvrez l'application.",
    remindersEmpty: "Aucun rappel enregistré pour l'instant. Enregistrez une personne depuis vos résultats.",
    stepOf: (s, t) => `ÉTAPE ${s} SUR ${t}`,
    continueLabel: "Continuer →",
    skipLabel: "Passer →",
    tryAgain: "Réessayer",
    restartQuiz: "Recommencer le quiz",
    errorTitle: "Le nœud s'est défait en chemin",
    errorSub: "Je n'ai pas pu générer d'idées cette fois. Réessayez dans un instant.",
    moreIdeas: "5 autres idées",
    saveReminderTitle: "Enregistrer un rappel",
    namePlaceholder: "Nom (ex. Marc)",
    savedBtn: "Enregistré ✓",
    saveReminderBtn: "Enregistrer le rappel",
    startOver: "Recommencer",
    priceNote: "Les prix sont des estimations. Les liens peuvent inclure un code d'affiliation.",
    tabHome: "Accueil",
    tabQuiz: "Quiz",
    tabSaved: "Enregistrés",
    tabReminders: "Rappels",
    loadingMsgs: ["Déballage de quelques idées...", "Vérification de la liste de souhaits...", "Attache du nœud...", "Recherche de quelque chose de parfait..."],
  },
  de: {
    eyebrow: "GIFT FINDER",
    headline1: "Das perfekte Geschenk,",
    headline2: "jedes Mal",
    newQuiz: "Neues Quiz",
    newQuizSub: "Finde 5 Ideen in 60 Sekunden",
    freeSearchTitle: "Oder sag mir einfach, wonach du suchst",
    freeSearchPlaceholder: "z. B. etwas Gemütliches für meine Schwester, die Kerzen liebt, unter 50 €",
    findGifts: "Geschenke finden",
    savedIdeasStat: "gespeicherte Ideen",
    activeReminders: "aktive Erinnerungen",
    todayIsDay: (name) => `Heute ist ${name}s Tag! 🎉`,
    inDays: (name, d) => `${name} in ${d} Tagen`,
    tapToSeeAll: "Tippen, um alle Erinnerungen zu sehen",
    emptyHome: "Mach dein erstes Quiz: Du kannst Ideen speichern, die dir gefallen, und Erinnerungen für wichtige Anlässe einrichten.",
    savedTitle: "Gespeicherte Ideen",
    savedSub: "Die Geschenkideen, die du zur Seite gelegt hast, immer griffbereit.",
    savedEmpty: "Noch keine gespeicherten Ideen. Tippe auf das Herz bei einer Idee, um sie hier hinzuzufügen.",
    shop: "Kaufen",
    remindersTitle: "Erinnerungen",
    remindersSub: "Echte Push-Benachrichtigungen benötigen einen externen Dienst — vorerst zeige ich dir hier, wer bald dran ist, jedes Mal wenn du die App öffnest.",
    remindersEmpty: "Noch keine Erinnerungen gespeichert. Speichere eine Person aus deinen Ergebnissen.",
    stepOf: (s, t) => `SCHRITT ${s} VON ${t}`,
    continueLabel: "Weiter →",
    skipLabel: "Überspringen →",
    tryAgain: "Erneut versuchen",
    restartQuiz: "Quiz neu starten",
    errorTitle: "Die Schleife hat sich unterwegs gelöst",
    errorSub: "Diesmal konnte ich keine Ideen erzeugen. Bitte versuch es gleich noch einmal.",
    moreIdeas: "5 weitere Ideen",
    saveReminderTitle: "Erinnerung speichern",
    namePlaceholder: "Name (z. B. Max)",
    savedBtn: "Gespeichert ✓",
    saveReminderBtn: "Erinnerung speichern",
    startOver: "Neu beginnen",
    priceNote: "Preise sind grobe Schätzungen. Links können einen Partnercode enthalten.",
    tabHome: "Start",
    tabQuiz: "Quiz",
    tabSaved: "Gespeichert",
    tabReminders: "Erinnerungen",
    loadingMsgs: ["Ein paar Ideen auspacken...", "Wunschzettel wird geprüft...", "Schleife wird gebunden...", "Suche nach dem Richtigen..."],
  },
  nl: {
    eyebrow: "GIFT FINDER",
    headline1: "Het perfecte cadeau,",
    headline2: "elke keer",
    newQuiz: "Nieuwe quiz",
    newQuizSub: "Vind 5 ideeën in 60 seconden",
    freeSearchTitle: "Of vertel me gewoon wat je zoekt",
    freeSearchPlaceholder: "bijv. iets gezelligs voor mijn zus die van kaarsen houdt, onder de €50",
    findGifts: "Vind cadeaus",
    savedIdeasStat: "opgeslagen ideeën",
    activeReminders: "actieve herinneringen",
    todayIsDay: (name) => `Vandaag is het de dag van ${name}! 🎉`,
    inDays: (name, d) => `${name} over ${d} dagen`,
    tapToSeeAll: "Tik om alle herinneringen te zien",
    emptyHome: "Doe je eerste quiz: je kunt ideeën die je leuk vindt opslaan en herinneringen instellen voor belangrijke gelegenheden.",
    savedTitle: "Opgeslagen ideeën",
    savedSub: "De cadeau-ideeën die je hebt bewaard, altijd binnen handbereik.",
    savedEmpty: "Nog geen opgeslagen ideeën. Tik op het hartje bij een idee om het hier toe te voegen.",
    shop: "Kopen",
    remindersTitle: "Herinneringen",
    remindersSub: "Echte pushmeldingen vereisen een externe dienst — voorlopig laat ik hier zien wie er binnenkort aan de beurt is, elke keer als je de app opent.",
    remindersEmpty: "Nog geen herinneringen opgeslagen. Sla een persoon op vanuit je resultaten.",
    stepOf: (s, t) => `STAP ${s} VAN ${t}`,
    continueLabel: "Doorgaan →",
    skipLabel: "Overslaan →",
    tryAgain: "Opnieuw proberen",
    restartQuiz: "Quiz opnieuw starten",
    errorTitle: "Het lint is onderweg losgeraakt",
    errorSub: "Ik kon deze keer geen ideeën genereren. Probeer het zo weer.",
    moreIdeas: "5 meer ideeën",
    saveReminderTitle: "Herinnering opslaan",
    namePlaceholder: "Naam (bijv. Mark)",
    savedBtn: "Opgeslagen ✓",
    saveReminderBtn: "Herinnering opslaan",
    startOver: "Opnieuw beginnen",
    priceNote: "Prijzen zijn ruwe schattingen. Links kunnen een affiliatecode bevatten.",
    tabHome: "Start",
    tabQuiz: "Quiz",
    tabSaved: "Opgeslagen",
    tabReminders: "Herinneringen",
    loadingMsgs: ["Ideeën uitpakken...", "Verlanglijst controleren...", "Strik binden...", "Op zoek naar iets perfects..."],
  },
  da: {
    eyebrow: "GIFT FINDER",
    headline1: "Den rigtige gave,",
    headline2: "hver gang",
    newQuiz: "Ny quiz",
    newQuizSub: "Find 5 idéer på 60 sekunder",
    freeSearchTitle: "Eller bare fortæl mig, hvad du leder efter",
    freeSearchPlaceholder: "f.eks. noget hyggeligt til min søster, der elsker stearinlys, under 50 €",
    findGifts: "Find gaver",
    savedIdeasStat: "gemte idéer",
    activeReminders: "aktive påmindelser",
    todayIsDay: (name) => `Det er ${name}s dag i dag! 🎉`,
    inDays: (name, d) => `${name} om ${d} dage`,
    tapToSeeAll: "Tryk for at se alle påmindelser",
    emptyHome: "Tag din første quiz: du kan gemme idéer, du kan lide, og indstille påmindelser til vigtige lejligheder.",
    savedTitle: "Gemte idéer",
    savedSub: "Gaveidéerne du har lagt til side, altid inden for rækkevidde.",
    savedEmpty: "Ingen gemte idéer endnu. Tryk på hjertet ved en idé for at tilføje den her.",
    shop: "Køb",
    remindersTitle: "Påmindelser",
    remindersSub: "Rigtige push-notifikationer kræver en ekstern tjeneste — indtil videre viser jeg dig her, hvem der nærmer sig, hver gang du åbner appen igen.",
    remindersEmpty: "Ingen påmindelser gemt endnu. Gem en person fra dine resultater.",
    stepOf: (s, t) => `TRIN ${s} AF ${t}`,
    continueLabel: "Fortsæt →",
    skipLabel: "Spring over →",
    tryAgain: "Prøv igen",
    restartQuiz: "Genstart quiz",
    errorTitle: "Sløjfen gik op undervejs",
    errorSub: "Jeg kunne ikke generere idéer denne gang. Prøv igen om lidt.",
    moreIdeas: "5 flere idéer",
    saveReminderTitle: "Gem en påmindelse",
    namePlaceholder: "Navn (f.eks. Mikkel)",
    savedBtn: "Gemt ✓",
    saveReminderBtn: "Gem påmindelse",
    startOver: "Start forfra",
    priceNote: "Priser er groft estimerede. Links kan indeholde en affiliate-kode.",
    tabHome: "Hjem",
    tabQuiz: "Quiz",
    tabSaved: "Gemte",
    tabReminders: "Påmindelser",
    loadingMsgs: ["Pakker et par idéer ud...", "Tjekker ønskesedlen...", "Binder sløjfen...", "Finder noget helt rigtigt..."],
  },
  no: {
    eyebrow: "GIFT FINDER",
    headline1: "Den perfekte gaven,",
    headline2: "hver gang",
    newQuiz: "Ny quiz",
    newQuizSub: "Finn 5 idéer på 60 sekunder",
    freeSearchTitle: "Eller bare fortell meg hva du leter etter",
    freeSearchPlaceholder: "f.eks. noe koselig til søsteren min som elsker lys, under 50 €",
    findGifts: "Finn gaver",
    savedIdeasStat: "lagrede idéer",
    activeReminders: "aktive påminnelser",
    todayIsDay: (name) => `Det er ${name}s dag i dag! 🎉`,
    inDays: (name, d) => `${name} om ${d} dager`,
    tapToSeeAll: "Trykk for å se alle påminnelser",
    emptyHome: "Ta din første quiz: du kan lagre idéer du liker og sette påminnelser for viktige anledninger.",
    savedTitle: "Lagrede idéer",
    savedSub: "Gaveidéene du har lagt til side, alltid innen rekkevidde.",
    savedEmpty: "Ingen lagrede idéer ennå. Trykk på hjertet ved en idé for å legge den til her.",
    shop: "Kjøp",
    remindersTitle: "Påminnelser",
    remindersSub: "Ekte push-varsler krever en ekstern tjeneste — foreløpig viser jeg deg her hvem som nærmer seg, hver gang du åpner appen på nytt.",
    remindersEmpty: "Ingen påminnelser lagret ennå. Lagre en person fra resultatene dine.",
    stepOf: (s, t) => `TRINN ${s} AV ${t}`,
    continueLabel: "Fortsett →",
    skipLabel: "Hopp over →",
    tryAgain: "Prøv igjen",
    restartQuiz: "Start quiz på nytt",
    errorTitle: "Sløyfen løsnet underveis",
    errorSub: "Jeg klarte ikke å generere idéer denne gangen. Prøv igjen om et øyeblikk.",
    moreIdeas: "5 flere idéer",
    saveReminderTitle: "Lagre en påminnelse",
    namePlaceholder: "Navn (f.eks. Kristian)",
    savedBtn: "Lagret ✓",
    saveReminderBtn: "Lagre påminnelse",
    startOver: "Start på nytt",
    priceNote: "Priser er grove estimater. Lenker kan inneholde en affiliate-kode.",
    tabHome: "Hjem",
    tabQuiz: "Quiz",
    tabSaved: "Lagret",
    tabReminders: "Påminnelser",
    loadingMsgs: ["Pakker ut noen idéer...", "Sjekker ønskelisten...", "Knytter sløyfen...", "Finner noe helt riktig..."],
  },
  fi: {
    eyebrow: "GIFT FINDER",
    headline1: "Oikea lahja,",
    headline2: "joka kerta",
    newQuiz: "Uusi tietovisa",
    newQuizSub: "Löydä 5 ideaa 60 sekunnissa",
    freeSearchTitle: "Tai kerro vain, mitä etsit",
    freeSearchPlaceholder: "esim. jotain kodikasta siskolleni, joka rakastaa kynttilöitä, alle 50 €",
    findGifts: "Etsi lahjoja",
    savedIdeasStat: "tallennettua ideaa",
    activeReminders: "aktiivista muistutusta",
    todayIsDay: (name) => `Tänään on ${name}n päivä! 🎉`,
    inDays: (name, d) => `${name} ${d} päivän kuluttua`,
    tapToSeeAll: "Napauta nähdäksesi kaikki muistutukset",
    emptyHome: "Tee ensimmäinen tietovisasi: voit tallentaa pitämiäsi ideoita ja asettaa muistutuksia tärkeisiin tilaisuuksiin.",
    savedTitle: "Tallennetut ideat",
    savedSub: "Lahjaideat, jotka olet laittanut talteen, aina käden ulottuvilla.",
    savedEmpty: "Ei vielä tallennettuja ideoita. Napauta sydäntä idean kohdalla lisätäksesi sen tänne.",
    shop: "Osta",
    remindersTitle: "Muistutukset",
    remindersSub: "Oikeat push-ilmoitukset vaativat ulkoisen palvelun — toistaiseksi näytän tässä, kenen vuoro lähestyy joka kerta, kun avaat sovelluksen.",
    remindersEmpty: "Ei vielä tallennettuja muistutuksia. Tallenna henkilö tuloksistasi.",
    stepOf: (s, t) => `VAIHE ${s}/${t}`,
    continueLabel: "Jatka →",
    skipLabel: "Ohita →",
    tryAgain: "Yritä uudelleen",
    restartQuiz: "Aloita tietovisa alusta",
    errorTitle: "Rusetti aukesi matkalla",
    errorSub: "En pystynyt luomaan ideoita tällä kertaa. Yritä hetken kuluttua uudelleen.",
    moreIdeas: "5 lisää ideaa",
    saveReminderTitle: "Tallenna muistutus",
    namePlaceholder: "Nimi (esim. Mikko)",
    savedBtn: "Tallennettu ✓",
    saveReminderBtn: "Tallenna muistutus",
    startOver: "Aloita alusta",
    priceNote: "Hinnat ovat suuntaa antavia arvioita. Linkit saattavat sisältää kumppanuuskoodin.",
    tabHome: "Koti",
    tabQuiz: "Visa",
    tabSaved: "Tallennetut",
    tabReminders: "Muistutukset",
    loadingMsgs: ["Avataan muutamia ideoita...", "Tarkistetaan toivelistaa...", "Sidotaan rusettia...", "Etsitään jotain juuri oikeaa..."],
  },
  es: {
    eyebrow: "GIFT FINDER",
    headline1: "El regalo perfecto,",
    headline2: "cada vez",
    newQuiz: "Nuevo cuestionario",
    newQuizSub: "Encuentra 5 ideas en 60 segundos",
    freeSearchTitle: "O simplemente dime qué buscas",
    freeSearchPlaceholder: "ej. algo acogedor para mi hermana que ama las velas, por menos de 50 €",
    findGifts: "Buscar regalos",
    savedIdeasStat: "ideas guardadas",
    activeReminders: "recordatorios activos",
    todayIsDay: (name) => `¡Hoy es el día de ${name}! 🎉`,
    inDays: (name, d) => `${name} en ${d} días`,
    tapToSeeAll: "Toca para ver todos los recordatorios",
    emptyHome: "Haz tu primer cuestionario: podrás guardar las ideas que te gusten y establecer recordatorios para ocasiones importantes.",
    savedTitle: "Ideas guardadas",
    savedSub: "Las ideas de regalo que has guardado, siempre a mano.",
    savedEmpty: "Aún no hay ideas guardadas. Toca el corazón en una idea para añadirla aquí.",
    shop: "Comprar",
    remindersTitle: "Recordatorios",
    remindersSub: "Las notificaciones push reales requieren un servicio externo — por ahora te muestro aquí quién se acerca cada vez que abres la app.",
    remindersEmpty: "Aún no hay recordatorios guardados. Guarda a una persona desde tus resultados.",
    stepOf: (s, t) => `PASO ${s} DE ${t}`,
    continueLabel: "Continuar →",
    skipLabel: "Omitir →",
    tryAgain: "Intentar de nuevo",
    restartQuiz: "Reiniciar cuestionario",
    errorTitle: "El lazo se deshizo por el camino",
    errorSub: "Esta vez no pude generar ideas. Inténtalo de nuevo en un momento.",
    moreIdeas: "5 ideas más",
    saveReminderTitle: "Guardar un recordatorio",
    namePlaceholder: "Nombre (ej. Marcos)",
    savedBtn: "Guardado ✓",
    saveReminderBtn: "Guardar recordatorio",
    startOver: "Empezar de nuevo",
    priceNote: "Los precios son estimaciones. Los enlaces pueden incluir un código de afiliado.",
    tabHome: "Inicio",
    tabQuiz: "Cuestionario",
    tabSaved: "Guardados",
    tabReminders: "Recordatorios",
    loadingMsgs: ["Desenvolviendo algunas ideas...", "Revisando la lista de deseos...", "Atando el lazo...", "Buscando algo perfecto..."],
  },
  hi: {
    eyebrow: "GIFT FINDER",
    headline1: "सही उपहार,",
    headline2: "हर बार",
    newQuiz: "नया क्विज़",
    newQuizSub: "60 सेकंड में 5 आइडिया पाएं",
    freeSearchTitle: "या बस बताएं आप क्या ढूंढ रहे हैं",
    freeSearchPlaceholder: "जैसे मेरी बहन के लिए कुछ आरामदायक, जिसे कैंडल्स पसंद हैं, ₹2000 के अंदर",
    findGifts: "उपहार खोजें",
    savedIdeasStat: "सेव किए आइडिया",
    activeReminders: "सक्रिय रिमाइंडर",
    todayIsDay: (name) => `आज ${name} का दिन है! 🎉`,
    inDays: (name, d) => `${name} ${d} दिनों में`,
    tapToSeeAll: "सभी रिमाइंडर देखने के लिए टैप करें",
    emptyHome: "अपना पहला क्विज़ करें: आप पसंद आए आइडिया सेव कर सकते हैं और ज़रूरी मौकों के लिए रिमाइंडर सेट कर सकते हैं।",
    savedTitle: "सेव किए आइडिया",
    savedSub: "आपके सेव किए उपहार आइडिया, हमेशा आपके पास।",
    savedEmpty: "अभी कोई आइडिया सेव नहीं है। किसी आइडिया पर दिल के निशान को टैप करके यहां जोड़ें।",
    shop: "खरीदें",
    remindersTitle: "रिमाइंडर",
    remindersSub: "असली पुश नोटिफिकेशन के लिए बाहरी सेवा चाहिए — फिलहाल, जब भी आप ऐप खोलेंगे, यहां दिखाऊंगा कि किसका नंबर पास है।",
    remindersEmpty: "अभी कोई रिमाइंडर सेव नहीं है। क्विज़ के परिणामों से किसी व्यक्ति को सेव करें।",
    stepOf: (s, t) => `स्टेप ${s} / ${t}`,
    continueLabel: "जारी रखें →",
    skipLabel: "छोड़ें →",
    tryAgain: "फिर से कोशिश करें",
    restartQuiz: "क्विज़ फिर से शुरू करें",
    errorTitle: "रास्ते में रिबन खुल गया",
    errorSub: "इस बार आइडिया नहीं बना पाया। कृपया थोड़ी देर में फिर कोशिश करें।",
    moreIdeas: "5 और आइडिया",
    saveReminderTitle: "रिमाइंडर सेव करें",
    namePlaceholder: "नाम (जैसे राज)",
    savedBtn: "सेव हो गया ✓",
    saveReminderBtn: "रिमाइंडर सेव करें",
    startOver: "फिर से शुरू करें",
    priceNote: "कीमतें अनुमानित हैं। लिंक में एफिलिएट कोड हो सकता है।",
    tabHome: "होम",
    tabQuiz: "क्विज़",
    tabSaved: "सेव्ड",
    tabReminders: "रिमाइंडर",
    loadingMsgs: ["कुछ आइडिया खोल रहे हैं...", "विश लिस्ट चेक कर रहे हैं...", "रिबन बांध रहे हैं...", "कुछ एकदम सही ढूंढ रहे हैं..."],
  },
};

function daysUntilNext(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr);
  let next = new Date(today.getFullYear(), d.getMonth(), d.getDate());
  if (next < today) next = new Date(today.getFullYear() + 1, d.getMonth(), d.getDate());
  return Math.round((next - today) / (1000 * 60 * 60 * 24));
}

function GiftTag({ children, rotate = 0, accent = COLORS.violet, style = {} }) {
  return (
    <div
      style={{
        position: "relative",
        background: COLORS.paper,
        border: `1.5px dashed ${accent}`,
        borderRadius: 10,
        padding: "22px 20px 20px",
        transform: `rotate(${rotate}deg)`,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: "0 8px 20px rgba(80,60,20,0.10)",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -7,
          left: "50%",
          transform: "translateX(-50%)",
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: COLORS.bgBottom,
          border: `1.5px solid ${accent}`,
        }}
      />
      {children}
    </div>
  );
}

function ProgressTags({ total, current }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 9, marginBottom: 6, flexWrap: "wrap" }}>
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current;
        const active = i === current;
        const rotate = i % 2 === 0 ? -4 : 4;
        return (
          <div
            key={i}
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Work Sans', sans-serif",
              fontWeight: 600,
              fontSize: 12.5,
              transform: `rotate(${active ? 0 : rotate}deg)`,
              transition: "all 0.3s ease",
              background: done || active ? COLORS.pinkDeep : "transparent",
              color: done || active ? COLORS.paper : COLORS.violetDeep,
              border: `1.5px ${done || active ? "solid" : "dashed"} ${done || active ? COLORS.pinkDeep : COLORS.violetDeep}`,
            }}
          >
            {done ? "✓" : i + 1}
          </div>
        );
      })}
    </div>
  );
}

function TabButton({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        padding: "8px 4px 6px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: active ? COLORS.pinkDeep : "rgba(42,37,64,0.45)",
        position: "relative",
      }}
    >
      <Icon size={20} strokeWidth={active ? 2.4 : 2} />
      <span style={{ fontSize: 10.5, fontWeight: active ? 700 : 500, fontFamily: "'Work Sans', sans-serif" }}>{label}</span>
      {badge > 0 && (
        <span
          style={{
            position: "absolute",
            top: 2,
            right: "28%",
            background: COLORS.pinkDeep,
            color: COLORS.paper,
            fontSize: 9,
            fontWeight: 700,
            borderRadius: 999,
            minWidth: 15,
            height: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 3px",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export default function GiftFinder() {
  const [tab, setTab] = useState("home");
  const [quizPhase, setQuizPhase] = useState("quiz");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ interests: [] });
  const [results, setResults] = useState([]);
  const [previousNames, setPreviousNames] = useState([]);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [savedPeople, setSavedPeople] = useState([]);
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [saveForm, setSaveForm] = useState({ name: "", date: "" });
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [freeQuery, setFreeQuery] = useState("");
  const [searchHeader, setSearchHeader] = useState(null);
  const [lang, setLang] = useState("en");
  const [marketplace, setMarketplace] = useState("US");
  const [marketOpen, setMarketOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const advanceTimer = useRef(null);

  const T = TEXT[lang];
  const QUESTIONS = QUESTIONS_BY_LANG[lang];
  const marketInfo = MARKETPLACES.find((m) => m.code === marketplace) || MARKETPLACES[0];

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (quizPhase !== "loading") return;
    const id = setInterval(() => {
      setLoadingMsgIdx((i) => (i + 1) % T.loadingMsgs.length);
    }, 1300);
    return () => clearInterval(id);
  }, [quizPhase, lang]);

  useEffect(() => {
    return () => clearTimeout(advanceTimer.current);
  }, []);

  async function loadAll() {
    try {
      const people = await window.storage.get("gift-finder-people");
      if (people && people.value) setSavedPeople(JSON.parse(people.value));
    } catch (e) {}
    try {
      const ideas = await window.storage.get("gift-finder-saved-ideas");
      if (ideas && ideas.value) setSavedIdeas(JSON.parse(ideas.value));
    } catch (e) {}
    try {
      const prefs = await window.storage.get("gift-finder-prefs");
      if (prefs && prefs.value) {
        const p = JSON.parse(prefs.value);
        if (p.lang) setLang(p.lang);
        if (p.marketplace) setMarketplace(p.marketplace);
      }
    } catch (e) {}
    setDataLoaded(true);
  }

  async function persistPrefs(nextLang, nextMarket) {
    try {
      await window.storage.set("gift-finder-prefs", JSON.stringify({ lang: nextLang, marketplace: nextMarket }));
    } catch (e) {}
  }

  function changeLang(l) {
    setLang(l);
    persistPrefs(l, marketplace);
  }

  function changeMarket(code) {
    setMarketplace(code);
    setMarketOpen(false);
    persistPrefs(lang, code);
  }

  async function persistPeople(list) {
    setSavedPeople(list);
    try {
      await window.storage.set("gift-finder-people", JSON.stringify(list));
    } catch (e) {
      console.error("Error saving people:", e);
    }
  }

  async function persistIdeas(list) {
    setSavedIdeas(list);
    try {
      await window.storage.set("gift-finder-saved-ideas", JSON.stringify(list));
    } catch (e) {
      console.error("Error saving ideas:", e);
    }
  }

  async function savePerson() {
    if (!saveForm.name.trim() || !saveForm.date) return;
    const entry = {
      id: Date.now().toString(),
      name: saveForm.name.trim(),
      date: saveForm.date,
      relationship: answers.relationship || "",
    };
    await persistPeople([...savedPeople, entry]);
    setSaveForm({ name: "", date: "" });
    setSaveConfirmed(true);
    setTimeout(() => setSaveConfirmed(false), 2200);
  }

  async function deletePerson(id) {
    await persistPeople(savedPeople.filter((p) => p.id !== id));
  }

  function isIdeaSaved(name) {
    return savedIdeas.some((i) => i.name === name);
  }

  async function toggleSaveIdea(idea) {
    if (isIdeaSaved(idea.name)) {
      await persistIdeas(savedIdeas.filter((i) => i.name !== idea.name));
    } else {
      const entry = {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
        ...idea,
        for: answers.relationship ? `${answers.relationship} · ${answers.occasion || ""}` : searchHeader || "",
        savedAt: new Date().toISOString(),
      };
      await persistIdeas([entry, ...savedIdeas]);
    }
  }

  async function deleteSavedIdea(id) {
    await persistIdeas(savedIdeas.filter((i) => i.id !== id));
  }

  function amazonSearchUrl(query) {
    return `https://www.${marketInfo.domain}/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;
  }

  const q = QUESTIONS[step];

  function selectSingle(key, label) {
    const updated = { ...answers, [key]: label };
    setAnswers(updated);
    advanceTimer.current = setTimeout(() => {
      if (step === QUESTIONS.length - 1) {
        generate(updated, []);
      } else {
        setStep((s) => s + 1);
      }
    }, 280);
  }

  function toggleMulti(label) {
    setAnswers((prev) => {
      const current = prev.interests || [];
      let next;
      if (current.includes(label)) {
        next = current.filter((l) => l !== label);
      } else {
        if (current.length >= q.maxSelect) return prev;
        next = [...current, label];
      }
      return { ...prev, interests: next };
    });
  }

  function goBack() {
    clearTimeout(advanceTimer.current);
    if (step === 0) return;
    setStep((s) => s - 1);
  }

  function startQuiz() {
    setAnswers({ interests: [] });
    setResults([]);
    setPreviousNames([]);
    setSearchHeader(null);
    setFreeQuery("");
    setStep(0);
    setQuizPhase("quiz");
    setTab("quiz");
  }

  function resetAll() {
    startQuiz();
  }

  async function generate(finalAnswers, excludeNames) {
    setQuizPhase("loading");
    setTab("quiz");
    const a = finalAnswers || answers;
    const exclude = excludeNames || [];
    const prompt = `You are a gift expert with great taste and original ideas. Someone is looking for a gift with these characteristics:
- Recipient: ${a.relationship}
- Gender: ${a.gender && a.gender !== QUESTIONS_BY_LANG[lang][1].options[2].label ? a.gender : "not specified / no preference"}
- Occasion: ${a.occasion}
- Age: ${a.age}
- Interests: ${(a.interests || []).join(", ") || "not specified"}
- Personality / passions: ${a.personality && a.personality.trim() ? a.personality.trim() : "not specified"}
- Budget: ${a.budget}
${exclude.length ? `\nAvoid these ideas already suggested previously: ${exclude.join(", ")}.` : ""}

Generate exactly 5 specific, concrete, non-generic gift ideas (avoid vague ideas like "a book" or "a gift card": name a precise type of product). Respond in ${LANG_NAMES[lang]}. Reply ONLY with a valid JSON array, no extra text, no markdown, no backticks, in this exact format:
[{"name": "...", "price": "...", "reason": "one short, concrete sentence on why it's perfect for this person", "searchTerm": "a short, effective search term to find this product on an e-commerce site"}]
The "price" field must be an estimate consistent with the given budget.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1200,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const textBlock = (data.content || []).find((b) => b.type === "text");
      if (!textBlock) throw new Error("No text response");
      const clean = textBlock.text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Unexpected format");
      setResults(parsed);
      setPreviousNames([...exclude, ...parsed.map((p) => p.name)]);
      setQuizPhase("results");
    } catch (err) {
      console.error("Gift finder error:", err);
      setQuizPhase("error");
    }
  }

  async function generateFromSearch(query) {
    if (!query || !query.trim()) return;
    setQuizPhase("loading");
    setTab("quiz");
    setSearchHeader(query.trim());
    setAnswers({ interests: [] });
    const prompt = `You are a gift expert with great taste and original ideas. Someone typed this free-text request describing the gift they're looking for:
"${query.trim()}"

Read it carefully and infer as much as you can (recipient, occasion, interests, budget, personality) from what they wrote. Generate exactly 5 specific, concrete, non-generic gift ideas. Respond in ${LANG_NAMES[lang]}. Reply ONLY with a valid JSON array, no extra text, no markdown, no backticks, in this exact format:
[{"name": "...", "price": "...", "reason": "one short, concrete sentence on why it's perfect for this request", "searchTerm": "a short, effective search term to find this product on an e-commerce site"}]
The "price" field must be a reasonable estimate; infer a sensible budget if none was mentioned.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1200,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const textBlock = (data.content || []).find((b) => b.type === "text");
      if (!textBlock) throw new Error("No text response");
      const clean = textBlock.text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Unexpected format");
      setResults(parsed);
      setPreviousNames(parsed.map((p) => p.name));
      setQuizPhase("results");
    } catch (err) {
      console.error("Gift finder search error:", err);
      setQuizPhase("error");
    }
  }

  const upcoming = [...savedPeople]
    .map((p) => ({ ...p, days: daysUntilNext(p.date) }))
    .sort((a, b) => a.days - b.days);
  const nextUp = upcoming[0];

  const pageStyle = {
    minHeight: "100vh",
    width: "100%",
    background: `linear-gradient(180deg, ${COLORS.bgTop} 0%, ${COLORS.bgBottom} 100%)`,
    fontFamily: "'Work Sans', sans-serif",
    color: COLORS.ink,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "28px 16px 96px",
    position: "relative",
  };

  const cardStyle = {
    background: COLORS.paper,
    borderRadius: 18,
    padding: "24px 22px",
    boxShadow: "0 10px 28px rgba(90,65,20,0.10)",
  };

  const pillBtnStyle = {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "6px 12px",
    borderRadius: 999,
    border: `1.5px solid ${COLORS.violetDeep}`,
    background: COLORS.paper,
    color: COLORS.violetDeep,
    fontSize: 12.5,
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <style>{`@import url('${FONT_IMPORT_URL}');`}</style>

      {/* DECORATIONS */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "6%", left: "8%", width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.14)" }} />
        <div style={{ position: "absolute", top: "16%", right: "6%", width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.16)" }} />
        <div style={{ position: "absolute", bottom: "22%", left: "4%", width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
        <Sparkles size={20} color={COLORS.gold} style={{ position: "absolute", top: "10%", right: "22%", opacity: 0.55, transform: "rotate(-12deg)" }} />
        <Sparkles size={14} color="#FFFFFF" style={{ position: "absolute", top: "30%", left: "12%", opacity: 0.5, transform: "rotate(20deg)" }} />
        <Gift size={22} color="#FFFFFF" style={{ position: "absolute", bottom: "34%", right: "8%", opacity: 0.22, transform: "rotate(15deg)" }} />
        <Sparkles size={16} color={COLORS.gold} style={{ position: "absolute", bottom: "6%", left: "22%", opacity: 0.5, transform: "rotate(-8deg)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* TOP CONTROLS: language + marketplace */}
      <div style={{ width: "100%", maxWidth: 560, display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 10, position: "relative" }}>
        <div style={{ position: "relative" }}>
          <button onClick={() => setLangOpen((o) => !o)} style={pillBtnStyle}>
            <Globe size={13} /> {LANGUAGES.find((l) => l.code === lang)?.flag} {LANGUAGES.find((l) => l.code === lang)?.label} <ChevronDown size={13} />
          </button>
          {langOpen && (
            <div
              style={{
                position: "absolute",
                top: "115%",
                right: 0,
                background: COLORS.paper,
                borderRadius: 12,
                boxShadow: "0 10px 28px rgba(90,65,20,0.18)",
                overflow: "hidden",
                zIndex: 20,
                minWidth: 130,
                maxHeight: 320,
                overflowY: "auto",
              }}
            >
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    changeLang(l.code);
                    setLangOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "9px 14px",
                    background: l.code === lang ? COLORS.paperDim : "transparent",
                    border: "none",
                    fontSize: 13,
                    fontWeight: 500,
                    color: COLORS.ink,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ position: "relative" }}>
          <button onClick={() => setMarketOpen((o) => !o)} style={pillBtnStyle}>
            {marketInfo.flag} {marketInfo.code} <ChevronDown size={13} />
          </button>
          {marketOpen && (
            <div
              style={{
                position: "absolute",
                top: "115%",
                right: 0,
                background: COLORS.paper,
                borderRadius: 12,
                boxShadow: "0 10px 28px rgba(90,65,20,0.18)",
                overflow: "hidden",
                zIndex: 20,
                minWidth: 120,
              }}
            >
              {MARKETPLACES.map((m) => (
                <button
                  key={m.code}
                  onClick={() => changeMarket(m.code)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "9px 14px",
                    background: m.code === marketplace ? COLORS.paperDim : "transparent",
                    border: "none",
                    fontSize: 13,
                    fontWeight: 500,
                    color: COLORS.ink,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {m.flag} {m.code}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 30, maxWidth: 560 }}>
        <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: "0.32em", color: COLORS.gold, marginBottom: 10 }}>
          {T.eyebrow}
        </div>
        {tab === "home" && (
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "clamp(34px, 8vw, 54px)",
              lineHeight: 1.1,
              margin: 0,
              color: COLORS.ink,
              letterSpacing: "-0.01em",
            }}
          >
            {T.headline1}
            <br />
            {T.headline2}
          </h1>
        )}
      </div>

      {/* HOME */}
      {tab === "home" && (
        <div style={{ width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", gap: 16 }}>
          <button
            onClick={startQuiz}
            style={{
              ...cardStyle,
              border: `1.5px dashed ${COLORS.pinkDeep}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 22, color: COLORS.ink, marginBottom: 4 }}>
                {T.newQuiz}
              </div>
              <div style={{ fontSize: 13.5, color: COLORS.inkSoft }}>{T.newQuizSub}</div>
            </div>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: COLORS.pink,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Gift size={21} color={COLORS.ink} />
            </div>
          </button>

          <div style={cardStyle}>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 18, color: COLORS.ink, marginBottom: 10 }}>
              {T.freeSearchTitle}
            </div>
            <textarea
              value={freeQuery}
              onChange={(e) => setFreeQuery(e.target.value)}
              placeholder={T.freeSearchPlaceholder}
              rows={2}
              style={{
                width: "100%",
                padding: "11px 13px",
                borderRadius: 12,
                border: `1.5px solid ${COLORS.paperDim}`,
                fontFamily: "'Work Sans', sans-serif",
                fontSize: 14,
                color: COLORS.ink,
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
                marginBottom: 10,
              }}
            />
            <button
              onClick={() => generateFromSearch(freeQuery)}
              disabled={!freeQuery.trim()}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: 999,
                border: "none",
                fontWeight: 600,
                fontSize: 14.5,
                background: !freeQuery.trim() ? "#E9DFC2" : COLORS.violet,
                color: COLORS.paper,
                cursor: !freeQuery.trim() ? "not-allowed" : "pointer",
              }}
            >
              {T.findGifts}
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={cardStyle}>
              <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.violetDeep, fontFamily: "'Fraunces', serif" }}>
                {savedIdeas.length}
              </div>
              <div style={{ fontSize: 13, color: COLORS.inkSoft, marginTop: 2 }}>{T.savedIdeasStat}</div>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.pinkDeep, fontFamily: "'Fraunces', serif" }}>
                {savedPeople.length}
              </div>
              <div style={{ fontSize: 13, color: COLORS.inkSoft, marginTop: 2 }}>{T.activeReminders}</div>
            </div>
          </div>

          {nextUp && (
            <button
              onClick={() => setTab("reminders")}
              style={{ ...cardStyle, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left", border: "none" }}
            >
              <CalendarHeart size={22} color={COLORS.pinkDeep} style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, color: COLORS.ink, fontSize: 15 }}>
                  {nextUp.days === 0 ? T.todayIsDay(nextUp.name) : T.inDays(nextUp.name, nextUp.days)}
                </div>
                <div style={{ fontSize: 12, color: COLORS.inkSoft }}>{T.tapToSeeAll}</div>
              </div>
            </button>
          )}

          {dataLoaded && savedPeople.length === 0 && savedIdeas.length === 0 && (
            <p style={{ textAlign: "center", fontSize: 13.5, color: "rgba(42,37,64,0.6)", marginTop: 8, lineHeight: 1.6 }}>
              {T.emptyHome}
            </p>
          )}

          <p style={{ textAlign: "center", fontSize: 11, color: "rgba(27,34,71,0.45)", marginTop: 18 }}>
            © {new Date().getFullYear()} 100 Gift Ideas
          </p>
        </div>
      )}

      {/* SAVED */}
      {tab === "saved" && (
        <div style={{ width: "100%", maxWidth: 560 }}>
          <div style={cardStyle}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 22, color: COLORS.ink, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 8 }}>
              <Heart size={19} color={COLORS.pinkDeep} /> {T.savedTitle}
            </h2>
            <p style={{ color: COLORS.inkSoft, fontSize: 13.5, marginTop: 0, marginBottom: 18 }}>{T.savedSub}</p>

            {savedIdeas.length === 0 && (
              <p style={{ color: COLORS.inkSoft, fontSize: 14, textAlign: "center", padding: "20px 0" }}>{T.savedEmpty}</p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {savedIdeas.map((idea) => (
                <div key={idea.id} style={{ padding: "14px 14px", borderRadius: 12, background: COLORS.paperDim }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ fontWeight: 600, color: COLORS.ink, fontSize: 14.5, lineHeight: 1.3 }}>{idea.name}</div>
                    <button onClick={() => deleteSavedIdea(idea.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: COLORS.inkSoft, flexShrink: 0 }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                  {idea.for && <div style={{ fontSize: 11.5, color: COLORS.inkSoft, marginTop: 2 }}>{idea.for}</div>}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.pinkDeep }}>{idea.price}</span>
                    <a
                      href={amazonSearchUrl(idea.searchTerm || idea.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: COLORS.paper, background: COLORS.violet, padding: "6px 11px", borderRadius: 999, textDecoration: "none" }}
                    >
                      <ShoppingBag size={12} /> {T.shop}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REMINDERS */}
      {tab === "reminders" && (
        <div style={{ width: "100%", maxWidth: 560 }}>
          <div style={cardStyle}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 22, color: COLORS.ink, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 8 }}>
              <CalendarHeart size={19} color={COLORS.pinkDeep} /> {T.remindersTitle}
            </h2>
            <p style={{ color: COLORS.inkSoft, fontSize: 13.5, marginTop: 0, marginBottom: 18 }}>{T.remindersSub}</p>

            {upcoming.length === 0 && (
              <p style={{ color: COLORS.inkSoft, fontSize: 14, textAlign: "center", padding: "20px 0" }}>{T.remindersEmpty}</p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {upcoming.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: COLORS.paperDim,
                    border: p.days <= 14 ? `1.5px solid ${COLORS.pinkDeep}` : "1.5px solid transparent",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: COLORS.ink, fontSize: 15 }}>{p.name}</div>
                    <div style={{ fontSize: 12.5, color: COLORS.inkSoft }}>
                      {p.relationship ? `${p.relationship} · ` : ""}
                      {p.days === 0 ? "🎉" : `${p.days}d`}
                    </div>
                  </div>
                  <button onClick={() => deletePerson(p.id)} aria-label="Remove" style={{ background: "transparent", border: "none", cursor: "pointer", color: COLORS.inkSoft, padding: 6 }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QUIZ FLOW */}
      {tab === "quiz" && (
        <div style={{ width: "100%", maxWidth: 780 }}>
          {quizPhase === "quiz" && (
            <div style={{ width: "100%", maxWidth: 560, margin: "0 auto" }}>
              <ProgressTags total={QUESTIONS.length} current={step} />
              <div style={{ textAlign: "center", fontSize: 12, letterSpacing: "0.1em", color: COLORS.violetDeep, marginBottom: 22, fontWeight: 600 }}>
                {T.stepOf(step + 1, QUESTIONS.length)}
              </div>

              <div style={{ ...cardStyle, padding: "32px 24px 28px", position: "relative" }}>
                {step > 0 && (
                  <button onClick={goBack} aria-label="Go back" style={{ position: "absolute", top: 18, left: 18, background: "transparent", border: "none", cursor: "pointer", color: COLORS.inkSoft, display: "flex", alignItems: "center", padding: 4 }}>
                    <ArrowLeft size={20} />
                  </button>
                )}

                <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 28, textAlign: "center", color: COLORS.ink, margin: "6px 0 4px" }}>
                  {q.title}
                </h2>
                {q.subtitle && <p style={{ textAlign: "center", color: COLORS.inkSoft, fontSize: 14, marginTop: 0, marginBottom: 18 }}>{q.subtitle}</p>}
                {!q.subtitle && <div style={{ marginBottom: 18 }} />}

                {q.type !== "text" && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                    {q.options.map((opt) => {
                      const isMulti = q.type === "multi";
                      const selected = isMulti ? (answers.interests || []).includes(opt.label) : answers[q.key] === opt.label;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => (isMulti ? toggleMulti(opt.label) : selectSingle(q.key, opt.label))}
                          style={{
                            fontWeight: 500,
                            fontSize: 14.5,
                            padding: "10px 16px",
                            borderRadius: 999,
                            border: `1.5px solid ${selected ? COLORS.violet : "#E6DCC0"}`,
                            background: selected ? COLORS.violet : "transparent",
                            color: selected ? COLORS.paper : COLORS.ink,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                          }}
                        >
                          <span>{opt.emoji}</span>
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.type === "text" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <textarea
                      value={answers.personality || ""}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, personality: e.target.value }))}
                      placeholder={q.placeholder}
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: 12,
                        border: `1.5px solid ${COLORS.paperDim}`,
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: 14.5,
                        color: COLORS.ink,
                        outline: "none",
                        resize: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
                      <button
                        onClick={() => {
                          if (step === QUESTIONS.length - 1) {
                            generate(answers, []);
                          } else {
                            setStep((s) => s + 1);
                          }
                        }}
                        style={{ fontWeight: 600, fontSize: 15, padding: "11px 26px", borderRadius: 999, border: "none", background: COLORS.pink, color: COLORS.ink, cursor: "pointer" }}
                      >
                        {answers.personality && answers.personality.trim() ? T.continueLabel : T.skipLabel}
                      </button>
                    </div>
                  </div>
                )}

                {q.type === "multi" && (
                  <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
                    <button
                      onClick={() => {
                        if ((answers.interests || []).length === 0) return;
                        if (step === QUESTIONS.length - 1) {
                          generate(answers, []);
                        } else {
                          setStep((s) => s + 1);
                        }
                      }}
                      disabled={(answers.interests || []).length === 0}
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        padding: "11px 26px",
                        borderRadius: 999,
                        border: "none",
                        background: (answers.interests || []).length === 0 ? "#E9DFC2" : COLORS.pink,
                        color: COLORS.ink,
                        cursor: (answers.interests || []).length === 0 ? "not-allowed" : "pointer",
                      }}
                    >
                      {T.continueLabel}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {quizPhase === "loading" && (
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <div style={{ width: 64, height: 64, margin: "0 auto 22px", borderRadius: "50%", border: `4px dashed ${COLORS.pinkDeep}`, animation: "spin 2.2s linear infinite" }} />
              <style>{`@keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }`}</style>
              <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 21, color: COLORS.ink }}>{T.loadingMsgs[loadingMsgIdx]}</p>
            </div>
          )}

          {quizPhase === "error" && (
            <div style={{ textAlign: "center", marginTop: 20, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 21, marginBottom: 8, color: COLORS.ink }}>{T.errorTitle}</p>
              <p style={{ color: COLORS.inkSoft, fontSize: 14, marginBottom: 22 }}>{T.errorSub}</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button onClick={() => generate(answers, [])} style={{ fontWeight: 600, padding: "10px 22px", borderRadius: 999, border: "none", background: COLORS.pink, color: COLORS.ink, cursor: "pointer" }}>
                  {T.tryAgain}
                </button>
                <button onClick={resetAll} style={{ fontWeight: 600, padding: "10px 22px", borderRadius: 999, border: `1.5px solid ${COLORS.violetDeep}`, background: "transparent", color: COLORS.violetDeep, cursor: "pointer" }}>
                  {T.restartQuiz}
                </button>
              </div>
            </div>
          )}

          {quizPhase === "results" && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 26 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: COLORS.violetDeep, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.1em", maxWidth: 340, textAlign: "center" }}>
                  <Sparkles size={14} style={{ flexShrink: 0 }} />
                  {searchHeader ? `"${searchHeader}"` : `${String(answers.relationship).toUpperCase()} · ${String(answers.occasion).toUpperCase()}`}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 22, padding: "0 4px" }}>
                {results.map((r, i) => {
                  const saved = isIdeaSaved(r.name);
                  return (
                    <GiftTag key={i} rotate={i % 2 === 0 ? -1.5 : 1.5}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <div style={{ fontWeight: 700, fontSize: 11, color: COLORS.paper, background: COLORS.violetDeep, display: "inline-block", padding: "2px 8px", borderRadius: 5 }}>
                          #{i + 1}
                        </div>
                        <button onClick={() => toggleSaveIdea(r)} aria-label="Save idea" style={{ background: "transparent", border: "none", cursor: "pointer", padding: 2 }}>
                          <Heart size={18} color={COLORS.pinkDeep} fill={saved ? COLORS.pinkDeep : "none"} />
                        </button>
                      </div>
                      <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 20, color: COLORS.ink, margin: "0 0 8px", lineHeight: 1.25 }}>
                        {r.name}
                      </h3>
                      <p style={{ color: COLORS.inkSoft, fontSize: 13.5, lineHeight: 1.5, margin: "0 0 12px" }}>{r.reason}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.pinkDeep }}>{r.price}</div>
                        <a
                          href={amazonSearchUrl(r.searchTerm || r.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 600, color: COLORS.paper, background: COLORS.violet, padding: "7px 12px", borderRadius: 999, textDecoration: "none" }}
                        >
                          <ShoppingBag size={13} /> {T.shop}
                        </a>
                      </div>
                    </GiftTag>
                  );
                })}
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                <button
                  onClick={() => generate(answers, previousNames)}
                  style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 600, fontSize: 13.5, padding: "9px 18px", borderRadius: 999, border: `1.5px solid ${COLORS.blue}`, background: "transparent", color: COLORS.blue, cursor: "pointer" }}
                >
                  <Shuffle size={14} /> {T.moreIdeas}
                </button>
              </div>

              <div style={{ maxWidth: 420, margin: "30px auto 0", ...cardStyle, padding: "20px 20px 18px" }}>
                <h4 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 17, color: COLORS.ink, margin: "0 0 10px", display: "flex", alignItems: "center", gap: 7 }}>
                  <CalendarHeart size={16} color={COLORS.pinkDeep} /> {T.saveReminderTitle}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <input
                    type="text"
                    placeholder={T.namePlaceholder}
                    value={saveForm.name}
                    onChange={(e) => setSaveForm((f) => ({ ...f, name: e.target.value }))}
                    style={{ padding: "10px 12px", borderRadius: 8, border: `1.5px solid ${COLORS.paperDim}`, fontSize: 14, outline: "none" }}
                  />
                  <input
                    type="date"
                    value={saveForm.date}
                    onChange={(e) => setSaveForm((f) => ({ ...f, date: e.target.value }))}
                    style={{ padding: "10px 12px", borderRadius: 8, border: `1.5px solid ${COLORS.paperDim}`, fontSize: 14, outline: "none", color: COLORS.ink }}
                  />
                  <button
                    onClick={savePerson}
                    disabled={!saveForm.name.trim() || !saveForm.date}
                    style={{
                      marginTop: 4,
                      padding: "11px",
                      borderRadius: 999,
                      border: "none",
                      fontWeight: 600,
                      fontSize: 14,
                      background: !saveForm.name.trim() || !saveForm.date ? "#E9DFC2" : COLORS.violet,
                      color: COLORS.paper,
                      cursor: !saveForm.name.trim() || !saveForm.date ? "not-allowed" : "pointer",
                    }}
                  >
                    {saveConfirmed ? T.savedBtn : T.saveReminderBtn}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
                <button
                  onClick={resetAll}
                  style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 14.5, padding: "11px 24px", borderRadius: 999, border: `1.5px solid ${COLORS.pinkDeep}`, background: "transparent", color: COLORS.pinkDeep, cursor: "pointer" }}
                >
                  <RotateCcw size={16} /> {T.startOver}
                </button>
              </div>

              <p style={{ textAlign: "center", fontSize: 11.5, color: "rgba(42,37,64,0.5)", marginTop: 22 }}>{T.priceNote}</p>
            </div>
          )}
        </div>
      )}

      {/* BOTTOM NAV */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: COLORS.paper,
          borderTop: `1px solid ${COLORS.paperDim}`,
          display: "flex",
          padding: "6px 8px calc(env(safe-area-inset-bottom, 0px) + 6px)",
          zIndex: 10,
        }}
      >
        <TabButton icon={HomeIcon} label={T.tabHome} active={tab === "home"} onClick={() => setTab("home")} />
        <TabButton icon={Gift} label={T.tabQuiz} active={tab === "quiz"} onClick={startQuiz} />
        <TabButton icon={Heart} label={T.tabSaved} active={tab === "saved"} onClick={() => setTab("saved")} badge={savedIdeas.length} />
        <TabButton icon={Bell} label={T.tabReminders} active={tab === "reminders"} onClick={() => setTab("reminders")} badge={savedPeople.length} />
      </div>
      </div>
    </div>
  );
}
