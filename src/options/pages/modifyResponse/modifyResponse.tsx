import React, { useEffect, useMemo, useRef } from 'react';
import { EditorLanguage, FormMode, IRule, MatchType, MatchTypeMap, MimeTypeMap } from 'models/formFieldModel';
import { encode } from 'options/utils';
import { PageType } from 'models/formFieldModel';
import Select from 'components/common/select/select';
import Editor from 'components/editor/editor';
import Form from 'components/form/form';
import SourceFields from 'components/common/source/sourceFields';
import RuleName from 'components/common/ruleName/ruleName';
import ColorCover from 'components/common/colorCover/colorCover';
import RuleActionType = chrome.declarativeNetRequest.RuleActionType

const defaultData = {
  name: '',
  matchType: MatchType.CONTAIN,
  source: '',
  pageType: PageType.MODIFY_RESPONSE,
  editorLang: EditorLanguage.HTML,
  editorValue: ''
}

const ModifyResponse = ({ onSave, mode, error, onChange, ruleData, setRuleData }) => {
  const editorRef = useRef<any>();
  const { name = defaultData.name,
          matchType = defaultData.matchType,
          source = defaultData.source,
          editorLang = defaultData.editorLang,
          editorValue = defaultData.editorValue
        } = ruleData;

  const onSubmit = () => {
    const form: IRule = {
      action: {
        type: RuleActionType.REDIRECT,
        redirect: {
          url: encode(MimeTypeMap[editorLang], editorValue),
        }
      },
      condition: {
        [MatchTypeMap[matchType]]: source,
      }
    };
    onSave(form);
  };

  const editorLangOptions = useMemo(() => Object.entries(EditorLanguage).reduce((previous: any, [value, label]: any) => {
    previous.push({value: value.toLowerCase(), label})
    return previous;
  }, []), []);

  useEffect(() => {
    if(mode === FormMode.CREATE) {
      setRuleData(defaultData);
    }
    editorRef.current.setValue(editorValue);
  }, []);


  return <div className="h-[150px] min-h-[600px] mt-[50px]">
    <ColorCover>
      <Form onSubmit={onSubmit} mode={mode} error={error} pageType={PageType.MODIFY_RESPONSE}>
        <div className="w-1/5">
          <RuleName value={name} onChange={onChange} error={error} />
        </div>
        <div className="mt-5">
          <SourceFields
            matchType={matchType}
            onChange={onChange}
            source={source}
            error={error}
          />
        </div>
        <div className="mt-5">
          <span className="mr-5">Select Response Type</span>
          <Select
            onChange={onChange}
            value={editorLang}
            options={editorLangOptions}
            name='editorLang'
          />
        </div>
        <div className='mt-5'>
          <Editor editorRef={editorRef} language={editorLang} onChange={onChange} />
        </div>
        </Form>
      </ColorCover>
    </div>
};

export default ModifyResponse;