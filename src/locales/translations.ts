export const translations = {
  ru: {
    search: {
      title: 'Поиск',
      placeholder: 'Введи имя, тег, почту...',
      empty: {
        title: 'Мы никого не нашли',
        subtitle: 'Попробуй скорректировать запрос'
      },
      error: {
        title: 'Какой-то сверхразум все сломал',
        subtitle: 'Постараемся быстро починить',
        retry: 'Попробовать снова'
      },
      departments: {
        all: 'Все',
        android: 'Android',
        ios: 'iOS',
        design: 'Дизайн',
        management: 'Менеджмент',
        qa: 'QA',
        back_office: 'Бэк-офис',
        frontend: 'Frontend',
        hr: 'HR',
        pr: 'PR',
        backend: 'Backend',
        support: 'Техподдержка',
        analytics: 'Аналитика'
      },
      sort: {
        title: 'Сортировка',
        alphabet: 'По алфавиту',
        birthday: 'По дню рождения'
      },
      network: {
        offline: "Не могу обновить данные. Проверь соединение с интернетом.",
        loading: "Секундочку, гружусь..."
      }
    },
    userDetails: {
      age: {
        year: 'год',
        years2_4: 'года',
        years: 'лет'
      }
    }
  },
  en: {
    search: {
      title: 'Search',
      placeholder: 'Enter name, tag, email...',
      empty: {
        title: 'We couldn\'t find anyone',
        subtitle: 'Try to adjust your search'
      },
      error: {
        title: 'Some superintelligence broke everything',
        subtitle: 'We\'ll try to fix it quickly',
        retry: 'Try again'
      },
      departments: {
        all: 'All',
        android: 'Android',
        ios: 'iOS',
        design: 'Design',
        management: 'Management',
        qa: 'QA',
        back_office: 'Back Office',
        frontend: 'Frontend',
        hr: 'HR',
        pr: 'PR',
        backend: 'Backend',
        support: 'Support',
        analytics: 'Analytics'
      },
      sort: {
        title: 'Sorting',
        alphabet: 'Alphabetically',
        birthday: 'By birthday'
      },
      network: {
        offline: "Can't update data. Check your internet connection.",
        loading: "Just a moment, loading..."
      }
    },
    userDetails: {
      age: {
        year: 'year',
        years2_4: 'years',
        years: 'years'
      }
    }
  }
};

export type Language = keyof typeof translations; 