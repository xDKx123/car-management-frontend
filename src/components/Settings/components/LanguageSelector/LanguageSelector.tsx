import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField
} from '@mui/material';
import {
  FC,
  useMemo,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../i18n/i18n';
import './LanguageSelector.css';

interface LanguageSelectorProps {
}

interface Language {
  id: string,
  label: string
}

const LanguageSelector: FC<LanguageSelectorProps> = (props: LanguageSelectorProps) => {
  const { t } = useTranslation()

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem('language') || i18n.language)


  const getLanguages = (): Language[] => {
    return i18n.languages.map((languageCode: string) => {
      const nameGenerator: Intl.DisplayNames = new Intl.DisplayNames(languageCode, { type: 'language' });
      const displayName: string | undefined = nameGenerator.of(languageCode);

      if (displayName && displayName.length > 0) {
        return {
          id: languageCode,
          label: displayName[0].toUpperCase() + displayName.slice(1)
        } as Language
      }

      return {
        id: languageCode,
        label: languageCode
      } as Language
    })
  }

  const options: Language[] = useMemo(() => getLanguages(), [])

  const onChange = (event: any, newValue: Language | null): void => {
    if (newValue) {
      setSelectedLanguage(newValue.id)
      i18n.changeLanguage(newValue.id)
    }
  }

  return (
    <Autocomplete renderInput={
      (params: AutocompleteRenderInputParams) => {
        return (
          <TextField {...params}
            margin={'normal'}
            label={t('language')}
            variant={'outlined'}
            style={{
              textTransform: 'capitalize',
            }}
          />
        )
      }
    }
      noOptionsText={t('noLanguagesAvailable')}
      options={getLanguages()}
      getOptionLabel={(option: Language) => option.label}
      isOptionEqualToValue={(option: Language, value: Language) => option.id === value.id}
      value={getLanguages().find((language: Language) => language.id === selectedLanguage)}
      onChange={onChange}
      style={{
        textTransform: 'capitalize',
      }}
    />
  )
}

export default LanguageSelector;