Traceback (most recent call last):
  File "/var/www/sites.back/venv/local/lib/python2.7/site-packages/tornado/web.py", line 1338, in _execute
    self.finish()
  File "/var/www/sites.back/venv/local/lib/python2.7/site-packages/tornado/web.py", line 877, in finish
    self.set_etag_header()
  File "/var/www/sites.back/venv/local/lib/python2.7/site-packages/tornado/web.py", line 1257, in set_etag_header
    etag = self.compute_etag()
  File "/var/www/sites.back/venv/local/lib/python2.7/site-packages/tornado/web.py", line 2185, in compute_etag
    version_hash = self._get_cached_version(self.absolute_path)
AttributeError: 'CommonStaticHandler' object has no attribute 'absolute_path'
