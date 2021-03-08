import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Footer from './Footer';
import ProgressBar from './ProgressBar';
import {BrowserConfig} from 'utils/config';
import UrlModal from './UrlModal';

export default ({data: {url, id}, active, updateTab}) => {
  const tabRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, toggleVisibility] = useState(false);
  const goBack = () => {
    if (!canGoBack) {
      return;
    }
    const {current} = tabRef;
    current && current.goBack();
  };

  const goForward = () => {
    if (!canGoForward) {
      return;
    }
    const {current} = tabRef;
    current && current.goForward();
  };

  const reload = () => {
    const {current} = tabRef;
    current && current.reload();
  };

  const goHome = () => {
    updateTab(id, {url: BrowserConfig.HOMEPAGE_URL});
  };

  const onLoadProgress = ({nativeEvent: {progress}}) => {
    setProgress(progress);
  };

  const onLoadEnd = ({
    nativeEvent: {canGoBack, canGoForward, loading, target, title, url},
  }) => {
    if (loading) {
      return;
    }
    setCanGoBack(canGoBack);
    setCanGoForward(canGoForward);
    setProgress(0);
    updateTab(id, {url});
  };

  const onNewSearch = (url) => {
    const {current} = tabRef;
    if (current) {
      current.stopLoading();
      current.injectJavaScript(
        `(function(){window.location.href = '${url}' })()`,
      );
    }
  };

  return (
    <>
      <View style={[styles.container, !active && styles.hide]}>
        <ProgressBar progress={progress} />
        <WebView
          ref={tabRef}
          source={{uri: url}}
          sharedCookiesEnabled
          javascriptEnabled
          allowsInlineMediaPlayback
          onLoadEnd={onLoadEnd}
          onLoadProgress={onLoadProgress}
        />
      </View>
      {active && (
        <Footer
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          goBack={goBack}
          goForward={goForward}
          reload={reload}
          toggleSearchBar={() => {
            toggleVisibility(true);
          }}
          goHome={() => {
            goHome(id);
          }}
        />
      )}
      {active && (
        <UrlModal
          isVisible={isVisible}
          toggle={toggleVisibility}
          onNewSearch={onNewSearch}
          initialValue={url}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  hide: {flex: 0, opacity: 0, display: 'none', width: 0, height: 0},
});
