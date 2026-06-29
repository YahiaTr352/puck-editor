import React from 'react'

export const CmsEditorLink: React.FC = () => {
  return (
    <div style={{ boxSizing: 'border-box', width: '100%', marginBottom: '24px', direction: 'rtl' }}>
      <style>{`
        /* Hide Payload's default collections group on the dashboard */
        .dashboard__group,
        .dashboard__collections,
        .dashboard__card-list {
          display: none !important;
        }
      `}</style>
      
      <ul className="card-group" style={{ 
        margin: 0, 
        padding: 0, 
        listStyle: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px'
      }}>
        {/* Card 1: Homepage (Pages) */}
        <li className="card-group__card">
          <div className="card card--align-left" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            <div className="card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px 10px 20px', borderBottom: 'none' }}>
              <span className="card__title" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--theme-text)' }}>
                <a href="/cms/collections/pages" style={{ textDecoration: 'none', color: 'inherit' }}>
                  🏠 الصفحة الرئيسية (Landing Page)
                </a>
              </span>
            </div>
            <div className="card__content" style={{ padding: '0 20px 20px 20px' }}>
              <span className="card__count" style={{ fontSize: '13px', color: 'var(--theme-text-muted)' }}>
                تعديل الصفحة الرئيسية للموقع
              </span>
            </div>
          </div>
        </li>

        {/* Card 2: Blogs */}
        <li className="card-group__card">
          <div className="card card--align-left" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            <div className="card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px 10px 20px', borderBottom: 'none' }}>
              <span className="card__title" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--theme-text)' }}>
                <a href="/cms/collections/pages?where[slug][like]=blog" style={{ textDecoration: 'none', color: 'inherit' }}>
                  📝 المدونة وتفاصيل المقالات
                </a>
              </span>
              <ul className="card__actions" style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative', zIndex: 10 }}>
                <li>
                  <a href="/cms/collections/pages/create" className="card__action" title="إنشاء مقال جديد" style={{ 
                    textDecoration: 'none', 
                    color: 'var(--theme-text-muted)', 
                    fontSize: '1.4rem', 
                    fontWeight: 'bold',
                    padding: '0 8px',
                    display: 'inline-block',
                    position: 'relative',
                    zIndex: 15
                  }}>
                    +
                  </a>
                </li>
              </ul>
            </div>
            <div className="card__content" style={{ padding: '0 20px 20px 20px' }}>
              <span className="card__count" style={{ fontSize: '13px', color: 'var(--theme-text-muted)' }}>
                إدارة مقالات المدونة وتعديلها
              </span>
            </div>
          </div>
        </li>

        {/* Card 3: FAQ */}
        <li className="card-group__card">
          <div className="card card--align-left" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            <div className="card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px 10px 20px', borderBottom: 'none' }}>
              <span className="card__title" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--theme-text)' }}>
                <a href="/cms/collections/pages/2" style={{ textDecoration: 'none', color: 'inherit' }}>
                  🙋‍♂️ الأسئلة الشائعة (FAQ)
                </a>
              </span>
            </div>
            <div className="card__content" style={{ padding: '0 20px 20px 20px' }}>
              <span className="card__count" style={{ fontSize: '13px', color: 'var(--theme-text-muted)' }}>
                إدارة وتعديل الأسئلة الشائعة
              </span>
            </div>
          </div>
        </li>

        {/* Card 4: Users */}
        <li className="card-group__card">
          <div className="card card--align-left" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            <div className="card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px 10px 20px', borderBottom: 'none' }}>
              <span className="card__title" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--theme-text)' }}>
                <a href="/cms/collections/users" style={{ textDecoration: 'none', color: 'inherit' }}>
                  👥 المستخدمون (Users)
                </a>
              </span>
              <ul className="card__actions" style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative', zIndex: 10 }}>
                <li>
                  <a href="/cms/collections/users/create" className="card__action" title="إنشاء مستخدم جديد" style={{ 
                    textDecoration: 'none', 
                    color: 'var(--theme-text-muted)', 
                    fontSize: '1.4rem', 
                    fontWeight: 'bold',
                    padding: '0 8px',
                    display: 'inline-block',
                    position: 'relative',
                    zIndex: 15
                  }}>
                    +
                  </a>
                </li>
              </ul>
            </div>
            <div className="card__content" style={{ padding: '0 20px 20px 20px' }}>
              <span className="card__count" style={{ fontSize: '13px', color: 'var(--theme-text-muted)' }}>
                إدارة مستخدمي النظام وصلاحياتهم
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
