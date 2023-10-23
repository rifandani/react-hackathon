import { useI18nContext } from '@i18n/i18n-react';
import { defaultLimit } from '@todo/constants/todos.constant';
import { useSearchParams } from 'react-router-dom';

export default function useTodosFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { LL } = useI18nContext();

  const params = Object.fromEntries(searchParams);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const selectedOption = params?.limit ?? defaultLimit;

  // #region HANDLERS
  const handleChangeLimit = (_limit: string | null) => {
    // set to url params
    searchParams.set('limit', _limit ?? defaultLimit);
    setSearchParams(searchParams);
  };
  // #endregion

  return { LL, selectedOption, handleChangeLimit };
}
